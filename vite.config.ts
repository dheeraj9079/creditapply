import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8082,
    allowedHosts: [
      "ec2-13-204-80-21.ap-south-1.compute.amazonaws.com", // Figenix ec2 hostname
    ],
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base: "/creditapply/",
}));
