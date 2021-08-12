const path = require('path');

module.exports = () => ({
    entry: ['@babel/polyfill', path.join(__dirname, 'client', 'src', 'start.tsx')],
    output: {
        path: path.join(__dirname, 'client', 'public'),
        filename: 'bundle.js',
    },
    performance: {
        hints: false,
    },
    devServer: {
        contentBase: path.join(__dirname, 'client', 'public'),
        proxy: {
            '/': {
                target: 'http://localhost:3001',
            },
            '/socket.io': {
                target: 'http://localhost:3001',
                ws: true,
            },
        },
        port: '3000',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
            },
            {
                test: /\.css$/i,
                use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
            },
            {
                test: /\.tsx?$/,
                use: [{ loader: 'babel-loader' }, { loader: 'ts-loader' }],
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
});
