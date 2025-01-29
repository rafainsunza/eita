const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production';

    return {
        mode: isProduction ? 'production' : 'development',
        entry: { bundle: path.resolve(__dirname, 'src/index.js') },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[name].[contenthash].js',
            clean: true,
            assetModuleFilename: 'assets/[name][ext]'
        },
        devtool: isProduction ? false : 'source-map',
        devServer: {
            static: {
                directory: path.resolve(__dirname, 'src')
            },
            port: 3000,
            open: true,
            hot: true,
            compress: true,
            historyApiFallback: true,
        },
        module: {
            rules: [
                {
                    test: /\.component\.(scss|sass)$/i,
                    use: [
                        {
                            loader: 'css-loader',
                            options: { exportType: 'string' }
                        },
                        'sass-loader'
                    ]
                },
                {
                    test: /\.(scss|sass)$/i,
                    exclude: /\.component\.(scss|sass)$/i,
                    use: [
                        isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                        'css-loader',
                        'sass-loader'
                    ]
                },
                {
                    test: /\.css$/,
                    use: [
                        isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                        'css-loader'
                    ]
                },
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [['@babel/preset-env', { targets: '> 0.25%, not dead' }]]

                        }
                    }
                },
                {
                    test: /\.(png|svg|jpg|jpeg|gif)$/i,
                    type: 'asset/resource'
                },
                {
                    test: /\.html$/,
                    use: 'html-loader'
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: 'src/template.html',
                minify: isProduction ? {
                    collapseWhitespace: true,
                    removeComments: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true
                } : false
            }),
            ...(isProduction ? [new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' })] : [])
        ]
    };
};
