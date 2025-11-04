import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.js",
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      include: [
        "src/utils/**/*.{js,jsx}",
        "src/store/slices/**/*.{js,jsx}",
        "src/components/**/*.{jsx}",
      ],
      exclude: [
        "node_modules/",
        "src/setupTests.js",
        "**/*.config.js",
        "**/*.test.{js,jsx}",
        "**/*.spec.{js,jsx}",
        "**/dist/**",
        "src/main.jsx",
        "src/App.jsx",
        "src/pages/**",
        "src/services/api.js",
        "src/utils/alertsCard.js",
        "src/store/store.js",
      ],
    },
  },
});
