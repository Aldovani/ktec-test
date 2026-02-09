import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    setupFiles: ["./tests/setup.ts"],
    include: ["./tests/e2e/*.spec.ts"],
  },
  plugins: [tsconfigPaths()],
});
