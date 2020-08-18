const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require ("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { InjectManifest } = require("workbox-webpack-plugin");

module.exports = {
    entry: {
        home:"./src/app.js",
        competition: "./src/competition.js",
        team: "./src/team.js"
    },
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
                test:/\.html$/,
                loader: "html-loader",
                options:{
                    attributes:true
                }
            },
            {
                test:/\.(png|jpg|svg)$/,
                use:[
                    {
                        loader: "file-loader",
                        options:{
                            outputPath:"assets/img"
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
    plugins:[
        new HtmlWebpackPlugin({
            template:"./src/index.html",
            filename:"index.html",
            chunks:["home"]
        }),
        new HtmlWebpackPlugin({
            template:"./src/team.html",
            filename:"team.html",
            chunks:["team"]
        }),
        new HtmlWebpackPlugin({
            template:"./src/competition.html",
            filename:"competition.html",
            chunks:["competition"]
        }),
        new HtmlWebpackPlugin({
            template:"./src/script/pages/404.html",
            filename:"pages/404.html",
            chunks:["pages"]
        }),
        new HtmlWebpackPlugin({
            template:"./src/script/pages/favorite.html",
            filename:"pages/favorite.html",
            chunks:["pages"]
        }),
        new HtmlWebpackPlugin({
            template:"./src/script/pages/home.html",
            filename:"pages/home.html",
            chunks:["pages"]
        }),
        new HtmlWebpackPlugin({
            template:"./src/script/pages/navs.html",
            filename:"pages/navs.html",
            chunks:["pages"]
        }),
        new HtmlWebpackPlugin({
            template:"./src/script/pages/restricted.html",
            filename:"pages/restricted.html",
            chunks:["pages"]
        }),
        new CopyWebpackPlugin({
            patterns:[
                {
                    from:"./src/assets",
                    to:"assets"
                },
                {
                    from:"./src/manifest.json",
                    to:"manifest.json"
                },
                {
                    from:"./src/favicon.ico",
                    to:"favicon.ico"
                }
            ]
        }),
        new CleanWebpackPlugin(),
        new InjectManifest({
            swSrc:"./src/sw.js"
        })
    ]
}