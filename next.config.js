/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["via.placeholder.com", "res.cloudinary.com", "unsplash.it"],
  },
  async rewrites() {
    // return process.env.NODE_ENV === "development"
    //   ?
    return [
      {
        source: "/api/:path*",
        destination: "https://green-it-server.onrender.com/api/v1/:path*",
      },
    ];
    // : [];
  },
};

module.exports = nextConfig;
