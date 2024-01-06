const path = require("path");
const webpack = require('webpack')
const childProcess = require('child_process')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  mode: "development",
  entry: {
    main: "./src/app.js"
  },
  output: {
    filename: "[name].js",
    path: path.resolve("./dist")
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          process.env.NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : 
          "style-loader", 
          "css-loader"
        ]
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        loader: "url-loader",
        options: {
          name: "[name].[ext]?[hash]",
          limit: 10000 // 10Kb
        }
      }
    ]
  },
  /**
   * TODO: 아래 플러그인을 추가해서 번들 결과를 만들어 보세요.
   * 1. BannerPlugin: 결과물에 빌드 시간을 출력하세요.
   * 2. HtmlWebpackPlugin: 동적으로 html 파일을 생성하세요.
   * 3. CleanWebpackPlugin: 빌드 전에 아웃풋 폴더를 깨끗히 정리하세요.
   * 4. MiniCssExtractPlugin: 모듈에서 css 파일을 분리하세요.
   */
  plugins : [
    // new MyWebpackPlugin
    new webpack.BannerPlugin({
      banner: `
        Build Data: ${new Date().toLocaleString()}
        Commit Version: ${childProcess.execSync('git rev-parse --short HEAD')}
        Author: ${childProcess.execSync('git config user.email')}
      `
    }),
    new webpack.DefinePlugin({
      TWO:'1+1',
      TWO_String: JSON.stringify('1+1'),
      'api.domain': JSON.stringify('http://dev.api.domain.com') // 객체로 기록하는 것도 가능하다. 
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      templateParameters: {
        env: process.env.NODE_ENV === 'development' ? '(개발용)' : ''
      },// EJS 문법으로 html > title 에 기록해두었기에, 각주하면 빌드 터짐... 
      // minify: process.env.NODE_ENV === 'production' ? {
      //   collapseWhitespace: true, // 빈칸을 제거
      //   removeComments: true // 주석을 제거 
      // } : false
    }),
    new CleanWebpackPlugin(),
    ...(process.env.NODE_ENV === 'production' ? [
      new MiniCssExtractPlugin(
        {
          filename: '[name].css'
        }
      )
    ] : [])
  ]
};
