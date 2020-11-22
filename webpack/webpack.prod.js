const { merge } = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const baseConfig = require("./webpack.base.js");
const { distDir, srcDir } = require("./utils");

module.exports = merge(baseConfig, {
    mode: "production",
    devtool: false,
    output: {
        path: distDir(),
        publicPath: "/",
        filename: "js/[name].[contenthash].js",
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "styles/[name].[contenthash].css",
            chunkFilename: "[id].css",
        }),
    ],
    module: {
        rules: [
            {
                test: /\.s?css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 2,
                        },
                    },
                    "postcss-loader",
                    {
                        loader: "sass-loader",
                        options: {
                            sassOptions: {
                                includePaths: [srcDir()],
                            },
                        },
                    },
                ],
            },
        ],
    },
    optimization: {
        minimize: true,
        minimizer: [new CssMinimizerPlugin(), "..."],
    },
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000,
    },
});
