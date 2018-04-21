/******************
 *name：公共方法
 *date：2018/02/27
 *author：Liu Li
 *remarks：null
 */
// 共同的header
$.ajax({
    url:'http://localhost:4858/html_component/header.html',
    type: 'get',
    dataType: 'html',
    success: function(_d){
        $(_d).prependTo($('body'));
        // 首页 头部搜索框
        //topSearchFn();
        new topSearchFn($('#topSearchId'));

        // 首页column栏目导航
        //columnNavFn();
        new columnNavFn($('#columnNavId'));
    }
});

// ajax方法 不传递请求
function ajaxFn(_url,callback){
    $.ajax({
        url: _url,
        type: 'get',
        dataType: 'json',
        success: function(_d){
            callback(_d);
        }
    })
}
// ajax方法 传递get请求
function getAjaxFn(_url,_paramObj,callback){
    $.ajax({
        url: _url,
        type: 'get',
        dataType: 'json',
        data:_paramObj,
        success: function(_d){
            callback(_d);
        }
    })
}
