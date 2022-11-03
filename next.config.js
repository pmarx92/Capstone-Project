/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  env: {
    MONGO_URI:
      "mongodb+srv://pama92:KZdQ77pYC9Lu7mWk@cluster0.e39w65n.mongodb.net/?retryWrites=true&w=majority",
  },
};

module.exports = nextConfig;
