import { spawn } from "node:child_process";
import { networkInterfaces } from "node:os";
import { resolve } from "node:path";

const port = process.env.PORT || "3035";
const address = Object.values(networkInterfaces())
  .flatMap((addresses) => addresses ?? [])
  .find((item) => item.family === "IPv4" && !item.internal)?.address;

console.log(`Local:   http://localhost:${port}`);
console.log(address ? `Network: http://${address}:${port}` : "Network address unavailable");
console.log("Keep this terminal open while other devices use the site.\n");

const nextBinary = resolve("node_modules", ".bin", process.platform === "win32" ? "next.cmd" : "next");
const server = spawn(nextBinary, ["dev", "-H", "0.0.0.0", "-p", port], { stdio: "inherit" });

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => server.kill(signal));
}

server.on("exit", (code) => process.exit(code ?? 0));
