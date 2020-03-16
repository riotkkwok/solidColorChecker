var path = require('path');
var webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: {
        "index.min": "./index.ts",
    },
    output: {
        path: __dirname,
        filename: "build/[name].js",
        libraryTarget: 'umd',
    },
    module: {
        rules: [
            {
                test: path.join(__dirname, 'src'),
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['es2015']
                  }
                }
            },
            {
              test: /\.tsx?$/,
              use: 'ts-loader'
            }
        ],
    },
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          include: /\.min\.js$/,
        }),
      ],
    },
}