/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",   // <-- YEH LINE ADD KI

  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    unoptimized: true,
  },
}

export default nextConfig
