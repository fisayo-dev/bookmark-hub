import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**", // Allows all external images (not recommended for security reasons)
            },
        ],
    },
};

export default nextConfig;
