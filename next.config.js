/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config, _) {
    config.module.rules.push({
      test: /\.mp3$/,
      use: {
        loader: "file-loader",
      },
    });

    return config;
  },
  async headers() {
    return [
      {
        source: "/assets-fingerprint/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public,max-age=31536000,immutable",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
