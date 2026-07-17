import { cp, mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const dist = path.join(root, "dist");
const assets = path.join(dist, "assets");
const server = path.join(dist, "server");

await rm(dist, { recursive: true, force: true });
await mkdir(assets, { recursive: true });
await mkdir(server, { recursive: true });

await cp(path.join(root, "public"), assets, { recursive: true });
await mkdir(path.join(assets, "_next"), { recursive: true });
await cp(path.join(root, ".next", "static"), path.join(assets, "_next", "static"), { recursive: true });

const appOutput = path.join(root, ".next", "server", "app");

async function listFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(entries.map(async (entry) => {
    const fullPath = path.join(directory, entry.name);
    return entry.isDirectory() ? listFiles(fullPath) : [fullPath];
  }));
  return files.flat();
}

const pages = {};
const flight = {};
const outputFiles = await listFiles(appOutput);

for (const file of outputFiles) {
  const relative = path.relative(appOutput, file);
  if (relative.startsWith("_") || !relative.endsWith(".html")) continue;

  const routeName = relative.slice(0, -".html".length).split(path.sep).join("/");
  const route = routeName === "index" ? "/" : `/${routeName}`;
  const html = await readFile(file, "utf8");
  pages[route] = html;

  const rscFile = file.replace(/\.html$/, ".rsc");
  try {
    flight[route] = await readFile(rscFile, "utf8");
  } catch {
    // Redirect-only pages may not emit an RSC sibling.
  }

  const assetFile = path.join(assets, relative);
  await mkdir(path.dirname(assetFile), { recursive: true });
  await writeFile(assetFile, html);
}

const worker = `const pages = ${JSON.stringify(pages)};
const flight = ${JSON.stringify(flight)};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const cleanPath = url.pathname.length > 1 ? url.pathname.replace(/\\/$/, "") : "/";
    const page = pages[cleanPath];

    if (page) {
      const wantsFlight = request.headers.get("rsc") === "1" || url.searchParams.has("_rsc");
      if (wantsFlight && flight[cleanPath]) {
        return new Response(flight[cleanPath], {
          headers: {
            "content-type": "text/x-component; charset=utf-8",
            "cache-control": "public, max-age=0, must-revalidate",
            "vary": "rsc, next-router-state-tree, next-router-prefetch",
          },
        });
      }

      return new Response(page, {
        headers: {
          "content-type": "text/html; charset=utf-8",
          "cache-control": "public, max-age=0, must-revalidate",
        },
      });
    }

    if (env?.ASSETS?.fetch) {
      return env.ASSETS.fetch(request);
    }

    return new Response("Not found", { status: 404 });
  },
};
`;

await writeFile(path.join(server, "index.js"), worker);
