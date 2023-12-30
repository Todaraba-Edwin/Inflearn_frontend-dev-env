const path = require("path")

module.exports = {
  mode: "development",
  entry: {
    main: "./src/app.js",
  },
  output: {
    filename: "[name].js",
    path: path.resolve("./dist"),
  },
  module : {
    rules : [
      {
        test: /\.js$/, // 로더가 동작하는 패턴
        use: [
          path.resolve('./my-webpack-loader.js')
        ]
      }
    ]
  }
}