const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const html = ['index'];

const htmlArray = html.map(name => {
    return new HtmlWebpackPlugin({
        filename: `${name}.html`,
        template: `${__dirname}/src/${name}.html`,
        templateParameters: () => {
            return { 'title': process.env.NODE_ENV == 'production' ? 'Landing page' : 'dev' }
        },
        hash: true,
        inject: true,
        chunks: [name]
    })
});

module.exports = {
    entry: {
        index: './src/js/index.js'
    },
    output: {
        filename: './js/[name].js',
        path: path.resolve(__dirname, 'public')
    },
    module: {
        rules: [
            {
                test: /\.js$/i,
                exclude: /node_modules/,
                include: path.resolve(__dirname, 'src/js'),
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }
            },
            {
                test: /\.s[ac]ss$/i,
                exclude: /node_modules/,
                use: [ MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].css'
        }),
        ...htmlArray
    ],
    devServer: {
        contentBase: './public'
    }
}