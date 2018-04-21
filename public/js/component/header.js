/*************************
 *name：共同header的JS文件
 *date：2018/03/08
 *author：Liu Li
 *remarks：null
 */
/**
 利用prototype重写
 */

// 首页-头部搜索框 构造器
function topSearchFn(_obj){
    this.objVal = _obj;
    this.vals   = topSearchVal;
    this.init();
}
topSearchFn.prototype = {
    init: function(){
        var _self   = this;
        var _t      = _self.objVal;
        var _v      = _self.vals;

        _self.defaultVal(_t,_v);
        _self.focusEvent(_t);
        _self.blurEvent(_t,_v);
    },

    // 默认显示的文字
    defaultVal: function(_p1,_p2){
        _p1.attr('value',_p2);
    },

    // 获得焦点
    focusEvent: function(_p1){
        _p1.on('focus',function(){
            $(this).attr('value','');
        });
    },

    // 失去焦点
    blurEvent: function(_p1,_p2){
        _p1.on('blur',function(){
            $(this).attr('value',_p2);
        })
    }
};

// 首页-栏目导航 columnNav 构造器
function columnNavFn(_obj){
    this.objVal = _obj;
    this.init();
}
columnNavFn.prototype = {
    init: function(){
        var _self = this;
        _self.getData();
    },
    getData: function(){
        var _self = this;
        ajaxFn(APILIST.columnNavJson,function(_data){
            if(_data.code != 200){
                console.log(_data.msg);
                return false;
            }
            _self.createDom(_data);
        })
    },
    createDom: function(_data){
        var _self   = this;
        var _arrs   = _data.links;
        var _len    = _arrs.length;
        var _liHtml = '';

        for(var i=0;i<_len;i++){
            // 判断是否有hot图标/右侧框线/新增的左边距
            if(_arrs[i].hot == true){
                _liHtml = _arrs[i].name + '<i class="hot">蝴蝶节</i>';
            }
            else if(_arrs[i].line == 1){
                _liHtml = _arrs[i].name + '<i class="rightBorder"></i>';
            }
            else if(_arrs[i].marLeft == 1){
                _liHtml = '<i class="mL_10"></i>'+_arrs[i].name;
            }
            else {
                _liHtml = _arrs[i].name;
            }
            //console.log(_liHtml);
            // 生成li标签
            $('<li/>',{})
                .html(_liHtml)
                .appendTo(_self.objVal);
        }
    }
};
