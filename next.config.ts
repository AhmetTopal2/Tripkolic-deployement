import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'tripkolic-beta.s3.amazonaws.com',
      'tripkolic-beta.s3.eu-central-1.amazonaws.com'
    ],
  },
};

export default nextConfig;
