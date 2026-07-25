import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const projectRoot = process.cwd();
const sourceDirectory = path.join(projectRoot, "public", "logos");
const outputDirectory = path.join(sourceDirectory, "grayscale");

const sourceFiles = [
  "claude.svg",
  "openai.svg",
  "cursor.svg",
  "gemini-cli.svg",
  "windsurf.svg",
  "github-copilot.svg",
  "chrome.png",
  "edge.png",
  "Brave_lion.svg",
  "perplexity-comet.png",
  "opera.png",
  "opera-gx.png",
  "chromium.png",
  "safari.png",
  "langchain.png",
  "langgraph.png",
  "crewai.png",
  "autogen-ag.svg",
  "openai-swarm.png",
  "llamaindex.png",
  "haystack.png",
  "semantic-kernal.png",
];

const mimeTypes = {
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
};

function createGrayscaleSvg(dataUri) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" role="img">
  <filter id="brand-gray" x="0" y="0" width="100" height="100" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
    <feFlood flood-color="#fff" result="white"/>
    <feComposite in="SourceGraphic" in2="white" operator="over" result="on-white"/>
    <feColorMatrix in="on-white" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  -0.2126 -0.7152 -0.0722 0 1" result="monochrome"/>
    <feComponentTransfer in="monochrome">
      <feFuncA type="gamma" amplitude="1" exponent="0.65" offset="0"/>
    </feComponentTransfer>
  </filter>
  <image x="4" y="4" width="92" height="92" preserveAspectRatio="xMidYMid meet" href="${dataUri}" filter="url(#brand-gray)"/>
</svg>
`;
}

function createSwarmWordmarkSvg(dataUri) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1810 932" role="img">
  <defs>
    <clipPath id="swarm-rounded">
      <rect width="1810" height="932" rx="90"/>
    </clipPath>
    <filter id="swarm-gray" color-interpolation-filters="sRGB">
      <feColorMatrix type="matrix" values="-0.2126 -0.7152 -0.0722 0 1  -0.2126 -0.7152 -0.0722 0 1  -0.2126 -0.7152 -0.0722 0 1  0 0 0 1 0"/>
    </filter>
  </defs>
  <image width="1810" height="932" href="${dataUri}" filter="url(#swarm-gray)" clip-path="url(#swarm-rounded)"/>
</svg>
`;
}

await mkdir(outputDirectory, { recursive: true });

for (const sourceFile of sourceFiles) {
  const extension = path.extname(sourceFile).toLowerCase();
  const source = await readFile(path.join(sourceDirectory, sourceFile));
  if (sourceFile === "autogen-ag.svg") {
    await writeFile(path.join(outputDirectory, "autogen.svg"), source);
    continue;
  }
  const dataUri = `data:${mimeTypes[extension]};base64,${source.toString("base64")}`;
  if (sourceFile === "openai-swarm.png") {
    await writeFile(path.join(outputDirectory, "openai-swarm.svg"), createSwarmWordmarkSvg(dataUri));
    continue;
  }
  const renamedOutputs = {
    "perplexity-comet.png": "comet.svg",
    "semantic-kernal.png": "semantic_kernel.svg",
  };
  const outputName = renamedOutputs[sourceFile]
    || `${path.basename(sourceFile, extension).toLowerCase()}.svg`;
  await writeFile(path.join(outputDirectory, outputName), createGrayscaleSvg(dataUri));
}

console.log(`Generated ${sourceFiles.length} grayscale agent logos.`);
