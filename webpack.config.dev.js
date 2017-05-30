const webpack = require('webpack');
const commonWebPackConfig = require('./webpack.config.common.js');

const config = {
    devtool: 'eval',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('dev')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false },
            mangle: false,
            sourcemap: true,
            beautify: true,
            dead_code: true,
            minimize: false,
            output: {
                comments: false
            },
        })
    ]
};


module.exports = commonWebPackConfig(config);