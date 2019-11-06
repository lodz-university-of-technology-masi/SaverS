const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'parser_webpack.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'parser',
    },
    node: {
        module: "empty",
        net: "empty",
        fs: "empty"
    },
};
