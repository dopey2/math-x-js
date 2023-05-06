const path = require('path');
const production = process.env.NODE_ENV === 'production' || false;

/**
 * We only use webpack to build in umd format ( browser )
 */

module.exports = {
    entry: ['./src/index.ts'],
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'swc-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    mode: 'production',
    output: {
        filename: production ? 'index.min.js' : 'index.js',
        path: path.resolve(__dirname, 'lib/umd'),
        globalObject: 'this',
        library: 'MathXCombination',
        libraryTarget: 'umd'
    },
    optimization: {
        minimize: production,
    }
};
