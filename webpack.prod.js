const { merge } = require('webpack-merge');
 const common = require('./webpack.common.js');
 const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
 const path = require("path")
 const Htmlwebpackplugin = require("html-webpack-plugin")
 const MiniCssExtractPlugin = require("mini-css-extract-plugin")
 const TerserPlugin = require("terser-webpack-plugin");

 module.exports = merge(common, {
   mode: 'production',
   plugins: [new Htmlwebpackplugin({
    template:"./src/index.html"
}),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(png|svg|webp|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin()
    ],
  },
   output:{
       path: path.resolve(__dirname,"dist"),
       filename: "bundle.[contenthash].js",
       clean:true,
}
   
 });