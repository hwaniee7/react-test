const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    open: true,
    hot: true,
    compress: true,
    port: 3000,
    historyApiFallback: true,
    liveReload: true,
  },
  output: {
    filename: '[contenthash].js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|ico)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024, //4kb
          },
        },
      },
      {
        test: /\.svg$/i,
        oneOf: [
          {
            issuer: /\.[jt]sx?$/,
            resourceQuery: /react/, // *.svg?react
            use: ['@svgr/webpack'],
          },
          {
            type: 'asset',
            parser: {
              dataUrlCondition: {
                maxSize: 4 * 1024,
              },
            },
          },
        ],
      },
    ],
  },
});
