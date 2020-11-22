const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const WebpackBar = require("webpackbar");
const { distDir, srcDir } = require("./utils");

module.exports = {
    entry: {
        main: srcDir("/index.ts"),
    },
    output: {
        path: distDir(),
        filename: "[name].js",
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "./src/index.html",
        }),
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
                use: [
                    {
                        loader: "ts-loader",
                        options: {},
                    },
                ],
            },
            {
                test: /\.s?css$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 2,
                            sourceMap: true,
                        },
                    },
                    "postcss-loader",
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true,
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
