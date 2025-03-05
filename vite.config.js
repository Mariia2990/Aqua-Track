import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true,
  },
});

// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react-swc";
// import svgr from "vite-plugin-svgr";

// export default defineConfig({
//   plugins: [react(), svgr()],
//   resolve: {
//     alias: {
//       src: "/src",
//       components: "/src/components",
//       pages: "/src/pages",
//       assets: "/src/assets",
//     },
//   },
//   base: "/front_AquaTrack-group-6/",
// });
