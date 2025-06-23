/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { dev, isServer }) => {
    if (dev) {
      // Configure webpack cache to be more resilient
      config.cache = {
        type: 'filesystem',
        buildDependencies: {
          config: [__filename],
        },
        // Add cache validation to prevent corruption
        version: '1.0.0',
      };
      
      // Reduce the number of concurrent cache operations
      config.parallelism = 1;
    }
    
    return config;
  },
  // Enable experimental features that can help with cache stability
  experimental: {
    // This can help with cache consistency
    optimizePackageImports: ['@radix-ui/react-icons'],
  },
};

module.exports = nextConfig;
