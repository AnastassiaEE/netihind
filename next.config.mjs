import createMDX from '@next/mdx';
import remarkGfm from 'remark-gfm';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import createNextIntlPlugin from 'next-intl/plugin';

/** @type {import('next').NextConfig} */

const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  //output: 'export',
  reactStrictMode: false,
  trailingSlash: true,
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

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    // More MDX options
    remarkPlugins: [remarkGfm, remarkFrontmatter, remarkMdxFrontmatter],
  },
});

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(withMDX(nextConfig));
