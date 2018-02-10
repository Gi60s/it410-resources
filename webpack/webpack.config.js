'use strict';
const path = require('path');
module.exports = {
    entry: { 
        app: path.resolve(__dirname, 'src/app.js')
    },

    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dest')
    },

    // the base directory for resolving entrypoints and loaders
    context: path.resolve(__dirname),

    resolve: {
        extensions: ['.js', '.vue', '.json'],   // automatically resolve these extensions
        alias: {
            'vue$': 'vue/dist/vue.esm.js',      // specify where to find vue
        }
    },

    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    { loader: "style-loader" }, // creates style nodes from JS strings
                    { loader: "css-loader" },   // translates CSS into CommonJS
                    { loader: "sass-loader" }   // compiles Sass to CSS
                ]
            },

            // vue loader: https://vue-loader.vuejs.org/en/
            {
                test: /\.vue$/,
                loader: 'vue-loader'            // converts .vue files into HTML, JavaScript, CSS
            }
        ]
    }
};