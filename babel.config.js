module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
        // debug: true,
      },
    ],
  ],
  // plugins: ['transform-object-rest-spread', 'transform-class-properties'],
  plugins: ['transform-class-properties'],
};
