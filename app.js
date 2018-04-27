/**
 * Created by Landers on 2018/3/2.
 */
var express = require('express');
var app     = express();

// 设置静态目录
app.use(express.static('public'));


app.listen(4858, function(){
    console.log('4858 这是电商网站jq版本的开发目录')
});
