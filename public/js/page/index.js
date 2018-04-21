/*************************
 *name：首页-index的JS文件
 *date：2018/02/08
 *author：Liu Li
 *remarks：null
 */
/**
     利用prototype重写
 */

// 首页-左侧导航子菜单 构造器
function CreateSubNavMenuFn(_obj){
    this.objVal = _obj;
    this.init();
}
CreateSubNavMenuFn.prototype = {
    init: function(){
        var _self = this;
        _self.getData();
    },
    getData: function(){
        var _self = this;
        ajaxFn(APILIST.subNavJson,function(_data){
            _self.createDom(_data);
            _self.liMouseEvent();

        })
    },
    createDom: function(_dat){
        var _self   = this;
        var _data   = _dat.subNavData;
        var _len    = _data.length;

        for(var i=0;i<_len;i++){
            $('<li/>')
                .html(function(){
                    var _this = $(this);
                    $('<p/>').html(_data[i].name).appendTo(_this);
                    $('<div/>',{
                            'class':'popUpDiv'
                        })
                        .html(function(){
                            $('<ul/>')
                                .html(function(){
                                    for(var j=0;j<_data[i].list.length;j++){
                                        $('<li/>')
                                            .html(_data[i].list[j])
                                            .appendTo($(this))
                                    }
                                })
                                .appendTo($(this))
                        })
                        .appendTo(_this);
                })
                .appendTo(_self.objVal)
        }
    },
    liMouseEvent: function(){
        var _self = this;
        _self.objVal
            .children()
            .on({
                mouseover: function(){
                    $(this).children('.popUpDiv').show();
                },
                mouseout: function(){
                    $(this).children('.popUpDiv').hide();
                }
            })
    }
};

// 首页-轮播图 构造器
function SliderWrapFn(_config){
    // 动态地添加多个属性
    for(var i in _config){
        this[i]=_config[i];
    }

    // 整个模块公用的属性、方法
    this.inx = 0;
    this.init();
}
SliderWrapFn.prototype = {
    init: function(){
        var _self = this;
        _self.getData();
    },
    getData: function(){
        var _self = this;
        ajaxFn(APILIST.sliderJson,function(_data){
            _self.createDom(_data.imgUrl);
            _self.createPoint(_data.imgUrl);
            _self.leftBtnEvent(_data.imgUrl);
            _self.rightBtnEvent(_data.imgUrl);
            _self.pointBtnEvent(_data.imgUrl)
        })
    },
    // 生成轮播图
    createDom: function(_dat){
        var _self       = this;
        var _dataLen    = _dat.length;
        for(var i=0; i<_dataLen; i++){
            $('<li/>')
                .html('<img src='+ _dat[i] +' />')
                .appendTo(_self.ulId);
        }
        // 根据图片数量设置ul的宽度
        _self.ulId.css('width',_dataLen * 997);
    },
    // 生成小白点
    createPoint: function(_dat){
        var _self       = this;
        var _dataLen    = _dat.length;
        var _wid        = _dataLen * 27;

        for(var i=0; i<_dataLen; i++){
            if(i==0){
                $('<li/>',{
                        'class':'redBg'
                    })
                    .appendTo(self.pointBtnId);
            } else {
                $('<li/>')
                    .appendTo(self.pointBtnId);
            }
        }
        // 根据图片数量设置小白点的宽度、位置
        _self.sliderPWId.css({
            'width':_wid,
            'marginLeft':-(_wid/2)-5
        });
        // 根据图片数量设置小白点背景的宽度、位置
        _self.sliderPWBgId.css({
            'width':_wid,
            'marginLeft':-(_wid/2)-5
        });
    },
    leftBtnEvent: function(_dat){
        var _self       = this;
        var _dataLen    = _dat.length;
        _self.leftBtnId.on('click',function(){
            if(_self.inx < (_dataLen-1)){
                _self.inx++;
            }else{
                _self.inx = 0;
            }
            _self.sliderAnimate(_self.ulId,_self.inx);
            _self.switchPointRedFn(_self.inx);
        })
    },
    rightBtnEvent: function(_dat){
        var _self = this;
        var _dataLen    = _dat.length;
        _self.rightBtnId.on('click',function(){
            if(_self.inx > 0){
                _self.inx--;
            }else{
                _self.inx = (_dataLen-1);
            }
            _self.sliderAnimate(_self.ulId,_self.inx);
            _self.switchPointRedFn(_self.inx);
        })
    },
    // 小白点按钮事件
    pointBtnEvent: function(){
        var _self = this;
        var _pointChld = this.pointBtnId.children();

        _pointChld.on('click',function(){
            _self.inx = $(this).index();
            _self.sliderAnimate(_self.ulId,_self.inx);
            _self.switchPointRedFn(_self.inx);
        })
    },
    // 切换图片的动画效果
    sliderAnimate: function(_n,_i){
        _n.stop().animate({'left':-(996*_i)},350);
    },
    // 小白点变红
    switchPointRedFn: function(_n){
        var _self = this;
        _self.pointBtnId.children()
            .eq(_n).addClass('redBg')
            .siblings().removeClass('redBg');
    }
};

// 首页-享品质产品列表 构造器
function GoodsWrapFn(_obj){
    this.objVal = _obj;
    this.init();
}
GoodsWrapFn.prototype = {
    init: function(){
        var _self = this;
        _self.getData();
    },
    getData: function(){
        var _self = this;
        ajaxFn(APILIST.goodsJson,function(_data){
            _self.createDom(_data.goodsData);
        })
    },
    createDom: function(_dat){
        var _self = this;
        var _str  = '';
        for(var i=0;i<_dat.length;i++){
            if(i==1){
                _str='goodsWrap gw_bg_' + (i+1) + ' mR_10 mL_10'
            } else {
                _str='goodsWrap gw_bg_' + (i+1)
            }

            $('<a/>',{})
                .attr({
                    'href':'http://localhost:5858/product.html?ids='+_dat[i].goodsId,
                    'target':'_blank'
                })
                .html(function(){
                    $('<div/>',{
                        'class':_str
                    })
                        .html(function(){
                            $('<dl/>',{
                                'class':'bg_'+(i+1
                                )})
                                .html(function(){
                                    $('<dt>')
                                        .html(_dat[i].name)
                                        .appendTo($(this));
                                    $('<dd>')
                                        .html(_dat[i].descript)
                                        .appendTo($(this));
                                })
                                .appendTo($(this));
                        })
                        .appendTo($(this));
                })
                .appendTo(_self.objVal);
        }
    }
};