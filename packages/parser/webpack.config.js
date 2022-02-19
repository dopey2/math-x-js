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
                use: 'ts-loader',
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
        library: 'MathXParser',
        libraryTarget: 'umd'
    },
    externals: {
        // Should not bundle any dependency of '@math-x-ts/core'
        // But instead look for global object 'MathXCore'
        // Defined in @math-x-ts/core/lib/umd/index.js
        '@math-x-ts/core': 'MathXCore'
    },
    optimization: {
        minimize: production,
    }
};