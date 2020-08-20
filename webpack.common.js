const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const WebpackPWAManifest = require("webpack-pwa-manifest");
const { InjectManifest } = require("workbox-webpack-plugin");

module.exports = {
    entry: "./src/app.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js"
    },
    devtool: "inline-source-map",
    resolve: {
        extensions: [".css", ".js", ".html"]
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                loader: "html-loader",
                options: {
                    attributes: true
                }
            },
            {
                test: /\.(png|jpg|svg)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            outputPath: "assets/img"
                        }
                    },
                    {
                        loader: "url-loader",
                        options: {
                            limit: 8192,
                        }
                    }
                ]

            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "index.html"
        }),
        new HtmlWebpackPlugin({
            template: "./src/team.html",
            filename: "team.html"
        }),
        new HtmlWebpackPlugin({
            template: "./src/competition.html",
            filename: "competition.html"
        }),
        new HtmlWebpackPlugin({
            template: "./src/script/pages/404.html",
            filename: "pages/404.html",
            chunks: ["pages"]
        }),
        new HtmlWebpackPlugin({
            template: "./src/script/pages/favorite.html",
            filename: "pages/favorite.html",
            chunks: ["pages"]
        }),
        new HtmlWebpackPlugin({
            template: "./src/script/pages/home.html",
            filename: "pages/home.html",
            chunks: ["pages"]
        }),
        new HtmlWebpackPlugin({
            template: "./src/script/pages/navs.html",
            filename: "pages/navs.html",
            chunks: ["pages"]
        }),
        new HtmlWebpackPlugin({
            template: "./src/script/pages/restricted.html",
            filename: "pages/restricted.html",
            chunks: ["pages"]
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: "./src/assets",
                    to: "assets"
                },
                {
                    from: "./src/favicon.ico",
                    to: "favicon.ico"
                }
            ]
        }),
        new CleanWebpackPlugin(),
        new InjectManifest({
            swSrc: "./src/sw.js"
        }),
        new WebpackPWAManifest({
            name: "B-Sport",
            short_name: "B-Sport",
            "gcm_sender_id": "177228885464",
            description: "Football information portal apps",
            start_url: "/index.html",
            display: "standalone",
            background_color: "#F5F5F5",
            theme_color: "#000000",
            icons: [
                {
                    src: path.resolve("dist/assets/img/icon.png"),
                    size: "512x512",
                    purpose: "any maskable"
                },
                {
                    src: path.resolve("dist/assets/img/icon_192.png"),
                    size: "192x192",
                    purpose: "any maskable"
                }
            ]
        }),
    ]
}