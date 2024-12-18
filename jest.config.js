module.exports = {
    transform: {
      '\\.js$': 'babel-jest',          // Transform JS files with Babel
      '\\.scss$': 'jest-transform-css', // Handle SCSS files with jest-transform-css
    },
    moduleNameMapper: {
      '\\.scss$': 'identity-obj-proxy',  // Mock SCSS imports
    },
  };