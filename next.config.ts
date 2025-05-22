import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL("https://img.spoonacular.com/recipes/**")],
  },
};

export default nextConfig;
