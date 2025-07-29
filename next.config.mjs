import createNextIntlPlugin from 'next-intl/plugin';

/** @type {import('next').NextConfig} */

const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  //output: 'export',
  reactStrictMode: true,
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cms.netihind.ee',
        port: '',
        //pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'rxysmdetqttpdqfmrpym.supabase.co',
        port: '',
        //pathname: '/**',
      },
    ],
  },
  /*
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    */
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
