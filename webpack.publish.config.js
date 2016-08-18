//开发配置文件
/*var jQuery = require("jquery");*/
var webpack = require('webpack');
var path = require('path');
//提取css的插件
var ExtractTextPlugin = require("extract-text-webpack-plugin");
//自动创建html
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    //入口文件
/*    entry:[
        //浏览器自动刷新配置
        'webpack/hot/dev-server',
        'webpack-dev-server/client?http://localhost:8080',
        path.resolve(__dirname,'src/js/app.js')
    ],*/
    entry:{
        app:path.resolve(__dirname,'src/js/app.js'),
        vendors:['react','react-dom']
    },
    //输出文件
    output: {
        path: path.resolve(__dirname, 'dist'),
        //输出文件名
        filename: 'bundle.js',
    },
/*    externals: {
        "jquery": "jQuery"
    },*/
    //读取jsx语法和es6语法
    module:{
        loaders:[
            {
                test: /\.jsx?$/, // 用正则来匹配文件路径，这段意思是匹配 js 或者 jsx
                loader: 'babel',// 加载模块 "babel" 是 "babel-loader" 的缩写
                query: {
                    presets: ['es2015', 'react']
                }
            },
            //处理css文件的配置
            {
                test: /\.css$/, // Only .css files
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
                //loader: 'style!css' // Run both loaders
            },
            //处理图片的，在loader后面加上？是配置一些属性，limit参数的单位是比特（bit）25000bit~3kb
            //大于limit=25000的时候图片用url小于limit=25000用base64文件流
            {
                test: /\.(png|jpg)$/,
                loader: 'url?limit=25000&name=img/[name].[ext]'
            }
        ]
    },
    plugins: [
        // 分离第三方应用插件
        new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
        //抽取css
        new ExtractTextPlugin("[name].css"),
        //自动生成的html的插件
        new HtmlWebpackPlugin({
            template:'./src/template.html',
            htmlWebpackPlugin:{
                "files":{
                    "css":["app.css"],
                    "js":["bundle.js","vendors.js"]
                }
            }
        }),
        // 定义默认环境的插件，性能优化
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        //// 压缩和混淆代码插件，代码优化
        new webpack.optimize.UglifyJsPlugin({
            //warning代表不良的框架或者库的使用，框架开发者为了推进技术而对使用者做出的提醒，不影响系统的使用。在开发过程中难免有暂时无法解决的warning，即便无warning，在生成环境中避免warning检查仍然很必要。使用 DefinePlugin 插件可以去掉react中的warning。加入变量之后react会做判断
            compress: {
                warnings: false
            }
        })
    ]
}






















