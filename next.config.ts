import type { NextConfig } from "next";
import { networkInterfaces } from "os";
import path from "path";

const lanOrigins = Object.values(networkInterfaces())
  .flatMap((addresses) => addresses ?? [])
  .filter((address) => address.family === "IPv4" && !address.internal)
  .map((address) => address.address);

const nextConfig: NextConfig = {
  allowedDevOrigins: [...lanOrigins, "*.ngrok-free.app", "*.ngrok-free.dev", "*.ngrok.io"],
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    // In development, proxy remote WordPress media through the local Next
    // server so phones only need access to the LAN host. Keep the existing
    // unoptimized behavior for the Cloudflare production build.
    unoptimized: process.env.NODE_ENV === "production",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "blogs.godel-labs.ai",
      },
      {
        protocol: "https",
        hostname: "secure.gravatar.com",
      },
    ],
  },
};

export default nextConfig;
