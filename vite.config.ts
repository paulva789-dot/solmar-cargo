/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Relative base lets the build work on GitHub Pages sub-paths and any static host.
export default defineConfig({
  base: "./",
  plugins: [react()],
  test: { environment: "node" },
});
