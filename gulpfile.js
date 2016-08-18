/**
 * Created by xuzhiwei on 2016/8/17.
 */
var gulp = require("gulp");
var webpack = require("webpack");
var webpackConfig = require("./webpack.publish.config.js");

gulp.task('default',['webpack'], function() {
    console.log("项目构建成功");
});

gulp.task('webpack', function(cb) {
    setTimeout(function(){
        webpack(webpackConfig, function (err, stats) {
            if (err){
                console.log("任务启动失败");
            }else{
                cb();
            }
        });
    },2000)
});