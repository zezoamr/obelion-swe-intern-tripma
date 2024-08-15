/** @type {import('next').NextConfig} */
const nextConfig = {
    productionBrowserSourceMaps: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'localhost',
            },
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
            },
        ],
    },
    // webpack(config) {
    //     config.experiments = {
    //         ...config.experiments,
    //         topLevelAwait: true,
    //     }
    //     return config
    // }
};

export default nextConfig;
