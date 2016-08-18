//���������ļ�
/*var jQuery = require("jquery");*/
var webpack = require('webpack');
var path = require('path');
//��ȡcss�Ĳ��
var ExtractTextPlugin = require("extract-text-webpack-plugin");
//�Զ�����html
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    //����ļ�
/*    entry:[
        //������Զ�ˢ������
        'webpack/hot/dev-server',
        'webpack-dev-server/client?http://localhost:8080',
        path.resolve(__dirname,'src/js/app.js')
    ],*/
    entry:{
        app:path.resolve(__dirname,'src/js/app.js'),
        vendors:['react','react-dom']
    },
    //����ļ�
    output: {
        path: path.resolve(__dirname, 'dist'),
        //����ļ���
        filename: 'bundle.js',
    },
/*    externals: {
        "jquery": "jQuery"
    },*/
    //��ȡjsx�﷨��es6�﷨
    module:{
        loaders:[
            {
                test: /\.jsx?$/, // ��������ƥ���ļ�·���������˼��ƥ�� js ���� jsx
                loader: 'babel',// ����ģ�� "babel" �� "babel-loader" ����д
                query: {
                    presets: ['es2015', 'react']
                }
            },
            //����css�ļ�������
            {
                test: /\.css$/, // Only .css files
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
                //loader: 'style!css' // Run both loaders
            },
            //����ͼƬ�ģ���loader������ϣ�������һЩ���ԣ�limit�����ĵ�λ�Ǳ��أ�bit��25000bit~3kb
            //����limit=25000��ʱ��ͼƬ��urlС��limit=25000��base64�ļ���
            {
                test: /\.(png|jpg)$/,
                loader: 'url?limit=25000&name=img/[name].[ext]'
            }
        ]
    },
    plugins: [
        // ���������Ӧ�ò��
        new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
        //��ȡcss
        new ExtractTextPlugin("[name].css"),
        //�Զ����ɵ�html�Ĳ��
        new HtmlWebpackPlugin({
            template:'./src/template.html',
            htmlWebpackPlugin:{
                "files":{
                    "css":["app.css"],
                    "js":["bundle.js","vendors.js"]
                }
            }
        }),
        // ����Ĭ�ϻ����Ĳ���������Ż�
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        //// ѹ���ͻ����������������Ż�
        new webpack.optimize.UglifyJsPlugin({
            //warning�������Ŀ�ܻ��߿��ʹ�ã���ܿ�����Ϊ���ƽ���������ʹ�������������ѣ���Ӱ��ϵͳ��ʹ�á��ڿ�����������������ʱ�޷������warning��������warning�������ɻ����б���warning�����Ȼ�ܱ�Ҫ��ʹ�� DefinePlugin �������ȥ��react�е�warning���������֮��react�����ж�
            compress: {
                warnings: false
            }
        })
    ]
}






















