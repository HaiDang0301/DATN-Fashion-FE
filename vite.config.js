import { defineConfig } from "vite";
import pluginRewriteAll from "vite-plugin-rewrite-all";
import dotenv from "dotenv";
import react from "@vitejs/plugin-react";
export default defineConfig({
  plugins: [react(), pluginRewriteAll(), dotenv.config()],
  define: {
    "process.env.HTTP_Server": JSON.stringify(process.env.HTTP_Server),
  },
});
