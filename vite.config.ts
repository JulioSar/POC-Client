///<reference types="vitest"/>
///<reference types="Vite/client"/>

import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig(({ command, mode }) => {
  return {
    plugins: [react()],
    test: {
      environment: "jsdom",
      globals: true,
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
