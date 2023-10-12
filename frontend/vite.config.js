/* eslint-disable no-undef */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      // Create aliases for your folders
      // "@Common": path.resolve(__dirname, "src/components/Common"),
      // "@Script": path.resolve(__dirname, "src/components/Script"),
      // "@Pages": path.resolve(__dirname, "src/Pages"),
      { find: "@Pages", replacement: path.resolve(__dirname, "src/Pages") },
      {
        find: "@Common",
        replacement: path.resolve(__dirname, "src/components/Common"),
      },
      {
        find: "@Script",
        replacement: path.resolve(__dirname, "src/components/Script"),
      },
      {
        find: "@Images",
        replacement: path.resolve(__dirname, "src/assets/images"),
      },
    ],
  },
});
