const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: './index.web.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[contenthash].js',
    publicPath: '/',
    clean: true,
  },
  resolve: {
    extensions: ['.web.tsx', '.web.ts', '.web.jsx', '.web.js', '.tsx', '.ts', '.jsx', '.js'],
    alias: {
      'react-native$': 'react-native-web',
      'react-native-svg': 'react-native-svg-web',
    },
  },
  module: {
    rules: [
      {
        test: /\.(tsx?|jsx?)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript',
            ],
            plugins: [
              'react-native-web',
              ['@babel/plugin-proposal-decorators', { legacy: true }],
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './web/index.html',
      filename: 'index.html',
      inject: 'body',
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'web'),
    },
    historyApiFallback: true,
    port: 3000,
    hot: true,
    open: true,
  },
};
