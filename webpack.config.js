const path = require('path'),
      Dotenv = require('dotenv-webpack'),
      envFilePath = path.resolve(__dirname, `.env.${process.env.NODE_ENV}`),
      srcPath = path.resolve(__dirname, "src"),
      outputPath = path.resolve(__dirname, 'public');

module.exports = {
    entry: path.resolve(srcPath, 'index.tsx'),
    output: {
        path: outputPath,
        filename: 'app.js',
    },
    module: {
        rules: [
            {
                test: /\.(tsx?|jsx?)$/,
                exclude: /node_modules/,
                use: "ts-loader"
            },
            {
                test: /\.(jpg|jpeg|png|woff|woff2|eot|ttf|svg)$/,
                exclude: /node_modules/,
                loader: 'url-loader?limit=100000'
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    {
                        loader: "css-loader",
                        options: { url: false }
                    },
                ]
            }
        ]
    },
    plugins: [
        new Dotenv({ path: envFilePath })
    ],
    resolve: {
        alias: {
            '@': srcPath,
            '@root': __dirname
        },
        extensions: ['.ts', '.js', '.tsx', '.jsx']
    },
    devServer: {
        contentBase: outputPath,
        historyApiFallback: true,
        inline: true,
        hot: true,
        port: 3000
    }
}
