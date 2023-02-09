/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const EslintPlugin = require('eslint-webpack-plugin');


module.exports = {
  devtool: "eval-source-map",
  mode: "development",
  entry: path.resolve(__dirname, './src/index.ts'),
  devServer: {
    watchFiles: ["./src"],
    liveReload: true,
    hot: true,
    static: {
      directory: path.join(__dirname, 'build'),
    },
  },
  module: {
    rules: [
      //ts loader
      {
        test: /\.ts$/,
        use: "ts-loader",
        include: [path.resolve(__dirname, "src")]
      },
      //img loader
      {
        test: /\.(png|svg|jpg|jpeg|gif|mp3)$/i,
        type: "asset/resource",
        generator: {
          filename: 'assets/img/[name][ext]'
        }
      },

      // loader for fonts
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        type: "asset/resource",
        generator: {
          filename: 'assets/fonts/[name][ext]'
        }
      },

      // scss loader
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "build"),
  },
  plugins: [
    new HtmlWebpackPlugin({
        template: path.resolve(__dirname, './src/index.html'),
        filename: 'index.html',
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/spotify.html'),
      filename: 'spotify.html',
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/apple.html'),
      filename: 'apple.html',
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/mainPage.html'),
      filename: 'mainPage.html',
    }),
    new EslintPlugin({ extensions: 'ts' }),
],
};
