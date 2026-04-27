import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig = {
  outputFileTracingRoot: __dirname,
  outputFileTracingIncludes: {
    "/*": ["./prisma/dev.db"],
  },
};

export default nextConfig;
