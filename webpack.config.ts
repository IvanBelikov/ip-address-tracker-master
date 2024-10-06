const path = require('path')
const Dotenv = require('dotenv-webpack')
const { plugins } = require('./postcss.config')

module.exports = {
    mode: 'development',
    entry: './src/index.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|jpg|gif|svg|woff|woff2|eot|ttf|otf)$/,
                oneOf: [
                    {
                        issuer: /\.ts$/,
                        use: {
                            loader: 'file-loader',
                        },
                    },
                ],
            },
        ],
    },
    plugins: [new Dotenv()],
    resolve: {
        extensions: ['.ts', '.js', 'tsx'],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
}
