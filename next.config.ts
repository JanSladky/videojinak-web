/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    if (process.env.NODE_ENV === "development") {
      return []; // žádné CSP ve vývoji
    }

    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: `
              default-src 'self';
              script-src 'self' https://www.google.com https://www.gstatic.com https://www.recaptcha.net 'unsafe-inline';
              frame-src https://www.youtube.com https://www.google.com https://www.recaptcha.net;
              style-src 'self' 'unsafe-inline';
              img-src 'self' data: https://www.gstatic.com https://www.google.com;
              connect-src 'self' https://www.google.com https://www.recaptcha.net;
            `.replace(/\s{2,}/g, " ").trim()
          }
        ]
      }
    ];
  }
};

module.exports = nextConfig;