const { merge } = require("webpack-merge");
const webpack = require("webpack");
const baseConfig = require("./webpack.base.js");

module.exports = merge(baseConfig, {
    mode: "development",
    devtool: "inline-source-map",
    devServer: {
        historyApiFallback: true,
        open: false,
        compress: true,
        hot: true,
        port: 4000,
    },
    plugins: [new webpack.HotModuleReplacementPlugin()],
});
