export default {
	reactStrictMode: true,
	images: { remotePatterns: [] },
	experimental: {
		esmExternals: true,
	},
	webpack: (config) => {
		config.resolve.fallback = {
			...config.resolve.fallback,
		};
		return config;
	},
};
