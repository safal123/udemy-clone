/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          hostname: 'utfs.io',
          protocol: 'https',
          port: '',
        },
        {
          hostname: 'img.clerk.com',
          protocol: 'https',
          port: '',
        },
        {
          hostname: 'fastly.picsum.photos',
          protocol: 'https',
          port: '',
        },
        {
          hostname: 'images.pexels.com',
          protocol: 'https',
        },
        {
          hostname: 'picsum.photos',
          protocol: 'https',
        },
        {
          hostname: 'randomuser.me',
          protocol: 'https',
        },
        {
          hostname: 'images.unsplash.com',
          protocol: 'https',
        },
      ]
    }
};

export default nextConfig;
