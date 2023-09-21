///<reference types="vitest"/>
///<reference types="Vite/client"/>

import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig(({ command, mode }) => {
  let tsConfigFile = "tsconfig.json";

  if (mode === "test") {
    tsConfigFile = "tsconfig.test.json";
    console.log("IM IN TEST MODE");
  }
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
