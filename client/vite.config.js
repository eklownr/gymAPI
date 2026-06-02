import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/**
 * working for http://localhost:5173/
 */
// export default defineConfig({
// 	plugins: [react()],
// 	test: {
// 		globals: true,
// 		environment: "jsdom", // Enables browser-like environment
// 	},
// });

/**
 * Deploy on Render
 */
export default defineConfig({
 	plugins: [react()],
	build: {
	  outDir: 'dist',
	  emptyOutDir: true,
	},
	// Om du använder React, se till att basePath är korrekt
	base: './', 
  })   