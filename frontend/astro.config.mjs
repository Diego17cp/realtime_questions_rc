// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  devToolbar: { enabled: false },

  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: [
        "localhost",
        "127.0.0.1",
        "perfectly-dream-counties-file.trycloudflare.com", // 👈 tu túnel
      ],
    },
  },

  integrations: [react()],
});
