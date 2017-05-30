const webpack = require('webpack');
const commonWebPackConfig = require('./webpack.config.common.js');

const config = {
    devtool: 'source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false },
            mangle: true,
            sourcemap: true,
            dead_code: true,
            minimize: true,
            output: {
                comments: false
            },
        })
    ]
};
module.exports = commonWebPackConfig(config);