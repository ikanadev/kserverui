import path from "path";
import { defineConfig } from "@solidjs/start/config";

export default defineConfig({
	server: {
		compatibilityDate: '2025-02-02',
	},
  vite: {
    resolve: {
      alias: {
        "@app": path.resolve(__dirname, "./src"),
        "@routes": path.resolve(__dirname, "./src/routesData"),
        "@panda": path.resolve(__dirname, "./styled-system"),
      },
    },
  },
});
