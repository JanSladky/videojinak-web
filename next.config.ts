/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "frame-src https://www.youtube.com https://*.youtube.com;"
          },
        ],
      },
    ];
  },
};

export default nextConfig;