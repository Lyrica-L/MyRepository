/**
 *name：首页-index的JS文件
 *date：2018/02/08
 *author：Liu Li
 *remarks：20180227-作废
 */
/**
     改用jQ来实现
 */

// 首页header 搜索框
 function topSearchFn(){
     $('#topSearchId')
         .attr('value',topSearchVal )
         .on({
             focus:function(){
                 $(this).attr('value','');
             },
             blur:function(){
                 $(this).attr('value',topSearchVal);
             }
         });
 }

// 栏目导航 columnNav
function columnNavFn(){
    //console.log(APILIST.columnNavJson);
    $.ajax({
        url: APILIST.columnNavJson,
        type: 'get',
        dataType: 'json',
        success: function(_d){
            //console.log(_d);
            if(_d.code != 200){
                console.log(_d.msg);
                return false
            }

            var _arrs   = _d.links;
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
                    .appendTo($('#columnNavId'));
            }
        }
    })
}

// 生成左侧导航子菜单
function createSubNavMenuFn(){
    var _subNavId     = $('#subNavId');
    //var _data       = DATA_temp.subNavData;
    //var _dataLen    = _data.length;

    //console.log( _dataLen );
    /*for(var i=0;i<_dataLen;i++){
        $('<li/>')
            .html(function(){
                var _this = $(this);
                $('<p/>').html(_data[i].name).appendTo(_this);
                $('<div/>',{
                        'class':'popUpDiv'
                    })
                    //.addClass('popUpDiv')
                    .html(function(){
                        $('<ul/>')
                            .html(function(){
                                var _listLen = _data[i].list.length;
                                for(j=0;j<_listLen;j++){
                                    $('<li/>')
                                        .html(_data[i].list[j])
                                        .appendTo($(this))
                                }
                            })
                            .appendTo($(this));
                    })
                    .appendTo(_this)
            })
            .appendTo(_subNavId)
    }*/

    /*
        改用json的ajax()方法（0226）
        获取数据，生成dom节点
    */
    $.ajax({
        url: APILIST.subNavJson,
        type: 'get',
        dataType: 'json',
        success: function(_d){
            //console.log(_d);
            var _data       = _d.subNavData;
            var _dataLen    = _data.length;

            // 生成li
            for(var i=0;i<_dataLen;i++){
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
                    .appendTo(_subNavId)
            }

            // 绑定事件
            _subNavId
                .children()
                .on({
                    mouseover:function(){
                        $(this)
                            .children('.popUpDiv')
                            .show();
                    },
                    mouseout:function(){
                        $(this)
                            .children('.popUpDiv')
                            .hide();
                    }
                })
        }
    });
}

// 左侧产品导航 subNavId 绑定事件,作废
function subNavMenuFn(){
    $('#subNavId')
        .children()
        .on({
            mouseover:function(){
                $(this)
                    .children('.popUpDiv')
                    .show();
            },
            mouseout:function(){
                $(this)
                    .children('.popUpDiv')
                    .hide();
            }
        });
}

// 首页 轮播图
function sliderWrapFn(){
    $.ajax({
        url: APILIST.sliderJson,
        type: 'get',
        dataType: 'json',
        success: function(_d){
            //console.log(_d);
            var _data           = _d.imgUrl;
            var _dataLen        = _data.length;
            var _leftBtnId      = $('#leftBtnId');
            var _rightBtnId     = $('#rightBtnId');

            var _ulId           = $('#ulId');

            var _pointBtnId     = $('#pointBtnId');
            var _inx            = 0;

            var _sliderPWId     = $('#sliderPWId');
            var _sliderPWBgId   = $('#sliderPWBgId');

            var _sliderPW_width = _dataLen * 27;
            var _pointMarL      = -(_sliderPW_width/2)-5;

            // 根据图片的数量，设置ul的宽度
            _ulId.css('width',_dataLen * 997);

            // 根据小白点数量设置宽度
            _sliderPWId.css({
                'width':_sliderPW_width,
                'marginLeft':_pointMarL
            });
            _sliderPWBgId.css({
                'width':_sliderPW_width,
                'marginLeft':_pointMarL
            });

            // 生成轮播图列表dom节点
            for(var i=0; i<_dataLen; i++){
                $('<li/>')
                    .html('<img src='+ _data[i] +' />')
                    .appendTo( _ulId );
            }

            // 生成小白点li
            for(var i=0; i<_dataLen; i++){
                $('<li/>')
                    .appendTo( _pointBtnId );
            }

            // 获取小白点列表的li节点，它是一个集合
            var _pBtn           = _pointBtnId.children();

            // 左按钮
            _leftBtnId.on('click',function(){
                if(_inx < (_dataLen-1)){
                    _inx++;
                }else{
                    _inx = 0;
                }
                //_ulId.css('left',-996*_inx );
                sliderAnimateFn(_ulId,_inx);
                // 小白点的颜色跟随图片来切换
                //_pBtn.eq(_inx).addClass('redBg').siblings().removeClass('redBg');
                switchPointRedFn(_inx);
            });

            // 右按钮
            _rightBtnId.on('click',function(){
                if(_inx > 0){
                    _inx--;
                }else{
                    _inx = (_dataLen-1);
                }
                //_ulId.css('left',-996*_inx );
                sliderAnimateFn(_ulId,_inx);
                // 小白点的颜色跟随图片来切换
                //_pBtn.eq(_inx).addClass('redBg').siblings().removeClass('redBg');
                switchPointRedFn(_inx);
            });

            function switchPointRedFn(_n){
                _pBtn.eq(_n).addClass('redBg').siblings().removeClass('redBg');
            }

            // 小白点的点击事件
            _pBtn.on('click',function(){
                var _this   = $(this);
                _inx        = _this.index();
                //_ulId.css('left',-996*_inx);
                sliderAnimateFn(_ulId,_inx);
                _this
                    .addClass('redBg')
                    .siblings()
                    .removeClass('redBg');
            });

            function sliderAnimateFn(_n,_i){
                _n.stop().animate({'left':-(996*_i)},350);
            }
        }
    });



}