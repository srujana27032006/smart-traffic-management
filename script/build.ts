import { build as viteBuild } from "vite";
import { build as esBuild } from "esbuild";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import viteConfig from "../vite.config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function build() {
  try {
    console.log("Building client...");
    await viteBuild(viteConfig);
    console.log("Client build completed.");

    console.log("Building server...");
    await esBuild({
      entryPoints: [path.resolve(__dirname, "../server/index.ts")],
      outfile: path.resolve(__dirname, "../dist/index.cjs"),
      bundle: true,
      platform: "node",
      format: "cjs",
      target: "node20",
      external: [
        "pg-native",
        "aws-sdk",
        "mock-aws-s3",
        "nock",
        "@mapbox/node-pre-gyp",
        "bufferutil",
        "utf-8-validate"
      ],
      loader: {
        ".ts": "ts"
      }
    });
    console.log("Server build completed.");
  } catch (error) {
    console.error("Build failed:", error);
    process.exit(1);
  }
}

build();
