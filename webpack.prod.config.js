const merge = require('webpack-merge');//Para juntar os arquivos
const webpackBase = require('./webpack.config');
const CompressionWebpackPlugin = require('compression-webpack-plugin');//para compressão de arquivo
const WorkboxPlugin = require('workbox-webpack-plugin');
const webpack = require('webpack');
const rimraf = require('rimraf');
const fs = require('fs');

if(fs.existsSync('./dist')){
    rimraf('./dist', ()=> console.log('./dist removed'))
}

//webpack.DefinePlugin vai gerar um variável de ambiente com o valor production
module.exports = merge(webpackBase, {
    plugins:[
        new CompressionWebpackPlugin({
            test: /\.js/
        }),
        new WorkboxPlugin.GenerateSW(),
        new webpack.DefinePlugin({
            'process.env':{
                'NODE_ENV': "'production'"
            }
        })
    ]
});