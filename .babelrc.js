module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        loose: true,
        modules: false,
        exclude: ['transform-typeof-symbol'],
        targets: "> 0.25%, not dead"
      }
    ]
  ]
};
