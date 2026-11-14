import { defineConfig } from "vitest/config";

export default defineConfig({
  test: { include: ["{model,pipeline,app}/test/**/*.test.ts"] },
});
