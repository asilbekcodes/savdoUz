import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  envPrefix: "APP_",
  assetsInclude: ["**/*.xlsx"], // Bu qatorda .xlsx fayllarini aktivlar sifatida ko'rsatamiz
  server: {
    "Content-Type": "application/javascript"
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build:{
    assetsDir: 'assets',
    emptyOutDir: true,
  }
});