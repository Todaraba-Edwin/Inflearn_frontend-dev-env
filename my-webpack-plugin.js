class MyWebpackPlugin {
  apply(compiler) {
    compiler.hooks.done.tap("My Plugin", stats => {
      console.log("MyPlugin: done")
    })

    // compiler.plugin() 함수로 후처리한다
    compiler.hooks.emit.tapAsync('MyWebpackPlugin', (compilation, callback) => {
      const source = compilation.assets['main.js'].source();
      const banner = [
                         '/**',
                         ' * This is result of processing by BannerPlugin.',
                         ' * Build Date: 2023-08-31',
                         ' */',
                     ].join('\n');
      const objectSourceNew = new compilation.compiler.webpack.sources.RawSource(banner + '\n\n' + source);
      compilation.updateAsset('main.js', objectSourceNew);
      callback();
  });
  }
}
module.exports = MyWebpackPlugin