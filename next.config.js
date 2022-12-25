/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["via.placeholder.com", "res.cloudinary.com", "unsplash.it"],
  },
  async rewrites() {
    return process.env.NODE_ENV === "development"
      ? [
          {
            source: "/api/:path*",
            destination: "http://localhost:5000/api/v1/:path*",
          },
        ]
      : [];
  },
};

module.exports = nextConfig;
