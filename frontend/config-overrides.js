module.exports = function override(config) {
  // Ignore source-map-loader warnings for face-api.js
  config.module.rules = config.module.rules.map(rule => {
    if (
      rule.enforce === 'pre' &&
      rule.use &&
      rule.use.some(u => u.loader && u.loader.includes('source-map-loader'))
    ) {
      rule.exclude = [/node_modules\/face-api\.js/];
    }
    return rule;
  });

  // Ignore 'fs' module in the browser
  config.resolve.fallback = {
    ...(config.resolve.fallback || {}),
    fs: false
  };

  return config;
};
