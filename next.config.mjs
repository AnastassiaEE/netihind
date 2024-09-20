import createMDX from '@next/mdx';
import remarkGfm from 'remark-gfm';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';

/** @type {import('next').NextConfig} */

const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  //output: 'export',
  reactStrictMode: true,
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

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
