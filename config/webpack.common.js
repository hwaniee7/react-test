const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

console.log('webpack.common.js ENV', process.env.ENV_NAME);

const dotenvPath = process.env.ENV_NAME ? `.env.${process.env.ENV_NAME}` : '.env';

console.log(dotenvPath);

require('dotenv').config(); // Dotenv.config() 대신 require('dotenv').config()를 사용


module.exports =  {
  entry: `${path.resolve(__dirname, '../src')}/index.js`,
  module: {
    rules: [
      {
        test: /\.jsx?$/, // .js 또는 .jsx 파일에 로더를 적용
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new Dotenv({
        path: dotenvPath
    }),
    new HtmlWebpackPlugin({
      template: `${path.resolve(__dirname, '../public')}/index.html`,
      favicon: `${path.resolve(__dirname, '../public')}/images/favicon.ico`,
    }),
    new webpack.ProvidePlugin({
      React: 'react',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@': path.resolve(__dirname, '../src/'),
    },
  },
};
 