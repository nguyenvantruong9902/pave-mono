import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      exclude: ["**/*.stories.tsx"],
    }),
    tailwindcss(),
  ],
  build: {
    emptyOutDir: false,
    lib: {
      entry: {
        "web-components": "./src/components/index.ts",
      },
      formats: ["es", "cjs"],
      fileName: (format, entryName) => {
        if (format === "es") return `${entryName}.mjs`;

        if (format === "cjs") return `${entryName}.cjs`;

        return `${entryName}.[format].js`;
      },
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
