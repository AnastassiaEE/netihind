import createMDX from '@next/mdx';
import remarkGfm from 'remark-gfm';

/** @type {import('next').NextConfig} */

const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  //output: 'export',
  reactStrictMode: false,
  /*
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    */
};

const withMDX = createMDX({
  options: {
    // More MDX options
    remarkPlugins: [remarkGfm],
  },
});

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
