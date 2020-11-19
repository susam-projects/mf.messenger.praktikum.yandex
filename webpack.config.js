const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");
const WebpackBar = require("webpackbar");

function rootDir(extraPath = "") {
    return path.resolve(__dirname, extraPath);
}

function srcDir(extraPath = "") {
    return rootDir(`./src${extraPath}`);
}

function distDir(extraPath = "") {
    return rootDir(`./static${extraPath}`);
}

module.exports = {
    mode: "development",
    entry: {
        main: srcDir("/index.ts"),
    },
    output: {
        path: distDir(),
        filename: "[name].js",
    },
    devServer: {
        historyApiFallback: true,
        open: false,
        compress: true,
        hot: true,
        port: 4000,
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "./src/index.html",
        }),
        new webpack.HotModuleReplacementPlugin(),
        new WebpackBar(),
    ],
    resolve: {
        extensions: [".ts", ".js", ".hbs"],
        alias: {
            handlebars: "handlebars/dist/handlebars.js",
        },
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: ["ts-loader"],
            },
            {
                test: /\.s?css$/,
                use: [
                    "style-loader",
                    "css-loader",
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
            {
                test: /\.hbs$/,
                type: "asset/source",
            },
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: "asset",
            },
            {
                test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                type: "asset",
            },
        ],
    },
};
