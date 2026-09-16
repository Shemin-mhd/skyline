import type { NextConfig } from "next";
import fs from "node:fs";
import path from "node:path";

try {
  const srcFile = "C:/Users/User/.gemini/antigravity-ide/brain/08d4a5e8-7d05-4348-a225-eb181d3175de/.user_uploaded/media_1789533090377.png";
  const destFile = path.join(process.cwd(), "public", "images", "about-skylink-perfect.png");
  if (fs.existsSync(srcFile)) {
    fs.copyFileSync(srcFile, destFile);
  }
} catch (e) {
  // ignore
}

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
