const common = require("./webpack.common.js");
const { merge } = require("webpack-merge");
const path = require("path");

// webpack plugin to extract css file
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// webpack plugin to minify css file
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
// webpack default javascript minimizer
const TerserPlugin = require("terser-webpack-plugin");

module.exports = merge(common, {
    mode: "production",
    output:{
        path: path.resolve(__dirname, "dist"),
        filename: "[name].[contentHash].js"
    },
    module:{
        rules: [
            {
                test:/\.css$/,
                use: [
                    MiniCssExtractPlugin.loader, 
                    {
                        loader:"css-loader",
                        options:{
                            url:false
                        }
                    }
                ]
            },
            {
                test:/\.js$/,
                exclude: "/node_modules/",
                use:[
                    {
                        loader:"babel-loader",
                        options:{
                            presets: ["@babel/preset-env"]
                        }
                    }
                ]
            }
        ]
    },
    plugins:[new MiniCssExtractPlugin({
        filename: "[name].[contentHash].css"
    })],
    optimization:{
        minimizer: [new OptimizeCssAssetsPlugin(), new TerserPlugin()]
    }
});