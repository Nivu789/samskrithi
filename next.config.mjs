/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
    dangerouslyAllowSVG: true,

    // ✅ allow external images (modern way)
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dl.dropboxusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
        pathname: "/**",
      },
    ],
}
}

export default nextConfig;
