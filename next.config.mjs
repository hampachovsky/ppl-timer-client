/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: process.env.API_URL,
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/time-tracker',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
