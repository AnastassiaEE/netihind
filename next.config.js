/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    reactStrictMode: false,
    images: { unoptimized: true }
    /*
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    */
}

module.exports = nextConfig
