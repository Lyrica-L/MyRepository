/*************************
 *name：product页面左侧图片部分的JS文件
 *date：2018/03/02
 *author：Liu Li
 *remarks：null
 */
// 左侧产品图片 构造器
function GoodsImgWrapFn(_config){
    for(var i in _config){
        this[i]=_config[i]
    }
    this.init();
}
GoodsImgWrapFn.prototype = {
    init: function(){
        var _self = this;
        _self.getData();
    },
    getData: function(){
        var _self = this;
        ajaxFn(APILIST.imgList,function(_dat){
            //console.log(_dat);
            // 数据加载完毕后隐藏提示文字
            _self.imgLoadingId.hide();

            // 显示、初始化大图和放大框
            _self.bigImgId
                .css('display','block')
                .attr('src',_dat.imgBig.img_url);
            _self.imgDetailsId
                .attr('src',_dat.imgSmall[0].img_details);

            // 大图上的透明块和放大框显示事件
            _self.mouseEvent();
            // 生成小图
            _self.createDom(_dat.imgSmall);
            _self.smallImgEvent(_self.smallImgId);
            _self.nextBtnEvent(_dat.imgSmall);
            _self.prevBtnEvent();
        })
    },
    // 鼠标移入or移出大图时，半透明块和局部放大框，显示or隐藏
    mouseEvent:function(){
        var _self = this;

        _self.bigImgDivId.on({
            mouseover: function(){
                _self.mouseMoveId.show();
                _self.localShowImgId.show();
                _self.mouseMoveEvent();
            },
            mouseout: function(){
                _self.mouseMoveId.hide();
                _self.localShowImgId.hide();
            }
        })
    },
    // 鼠标在大图上移动
    mouseMoveEvent: function(){
        var _self = this;
        _self.bigImgDivId.on('mousemove',function(e){
            //console.log('pageX--'+ e.pageX + '//pageY--' + e.pageY);
            // 获取当前鼠标在页面上的坐标
            var _epX            = e.pageX,
                _epY            = e.pageY;

            // 获取当前元素相对于网页的位置
            var _bigImgLocation = _self.bigImgDivId.offset();
            var _bigLeft        = _bigImgLocation.left,
                _bigTop         = _bigImgLocation.top;

            // 计算半透明块在大图上的位置
            var _imgDivWidth    = _self.bigImgDivId.width();
            var _moveDivWidth   = _self.mouseMoveId.width();
            var _eL             = _epX - _bigLeft - (_moveDivWidth/2);
            var _eT             = _epY - _bigTop - (_moveDivWidth/2);

            // 当半透明块移出边界时，不再继续向外移
            var _max = _imgDivWidth - _moveDivWidth;
            //console.log(_max);
            if(_eL<0){
                _eL = 0;
            } else if(_eL>_max){
                _eL = _max;
            }
            if(_eT<0){
                _eT = 0;
            } else if(_eT>_max){
                _eT = _max;
            }
            // 半透明块跟随鼠标的移动而变换位置
            _self.mouseMoveId.css({
                'left':_eL,
                'top':_eT
            });

            // 放大图跟随移动
            _self.imgDetailsId.css({
                'position':'absolute',
                'left':-_eL*1.6,
                'top':-_eT*1.6
            });
        });
    },
    // 生成小图列表
    createDom: function(_d){
        var _self = this;

        for(var i=0;i<_d.length;i++){
            $('<li/>')
                .attr('data_imgUrl',_d[i].img_url)
                .attr('data_details',_d[i].img_details)
                .html('<img src=' + _d[i].img_url + '>')
                .appendTo(_self.smallImgId);
        }
        // 根据小图数量设置ul的宽度
        _self.smallImgId.css('width',84*_d.length);
    },
    // 小图点击事件
    smallImgEvent: function(_d){
        var _self = this;
        _d.children().on('mouseover',function(){
            _self.bigImgId
                .attr('src',$(this).attr('data_imgUrl'));
            _self.imgDetailsId
                .attr('src',$(this).attr('data_details'));
        });
    },
    // 左按钮的点击事件
    prevBtnEvent: function(){
        var _self = this;
        _self.smallPrevBtnId.on('click',function(){
            //_self.smallImgId.css('left',40);
            _self.smallImgId
                .stop()
                .animate({'left':40},300);
        });
    },
    // 右按钮的点击事件
    nextBtnEvent: function(_d){
        var _self = this;
        _self.smallNextBtnId.on('click',function(){
            //_self.smallImgId.css('left',-295);
            _self.smallImgId
                .stop()
                .animate({'left':460-_d.length*84},300);
        });
    }
};

// 执行
new GoodsImgWrapFn({
    bigImgId: $('#bigImgId'),
    imgLoadingId: $('#imgLoadingId'),
    bigImgDivId: $('#bigImgDivId'),
    mouseMoveId: $('#mouseMoveId'),
    localShowImgId: $('#localShowImgId'),
    imgDetailsId: $('#imgDetailsId'),

    smallImgId: $('#smallImgId'),
    smallPrevBtnId:$('#smallPrevBtnId'),
    smallNextBtnId:$('#smallNextBtnId')
});