const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//Константа с путями
const PATHS = {
    src: path.join(__dirname, '../src'),
    dist: path.join(__dirname, '../dist'),
    assets: 'assets/'
};

module.exports = {
    // BASE config
    externals: {
        paths: PATHS
    },
    entry: {
        app: PATHS.src,
        // module: `${PATHS.src}/your-module.js`,
    },


    output: {
        filename: `${PATHS.assets}js/[name].js`,
        path: PATHS.dist,
        publicPath: '/'
    },
    module: {
        rules: [
            { test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                }
            },
            {test: /\.scss$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {sourceMap: true},
                    },{
                        loader: 'postcss-loader',
                        options: {sourceMap: true, config: {path: `./postcss.config.js`}},
                    },{
                        loader: 'sass-loader',
                        options: {sourceMap: true},
                    }

                ]
            },{
                test: /\.css$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {sourceMap: true},
                    },{
                        loader: 'postcss-loader',
                        options: {sourceMap: true, config: {path: `./postcss.config.js`}},
                    }
                ]
            }
        ]
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: `${PATHS.assets}css/[name].css`,
        }),
        new HtmlWebpackPlugin({
            hash: false,
            template: './src/index.html',
            filename: 'index.html',
        }),
        new CopyWebpackPlugin([
            { from: PATHS.src + '/img', to: `img` },
            { from: PATHS.src + '/static' },
        ]),
    ],
};
