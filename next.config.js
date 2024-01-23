/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["msquarefdc.sgp1.digitaloceanspaces.com", "res.cloudinary.com"],
  },
};

module.exports = nextConfig;
