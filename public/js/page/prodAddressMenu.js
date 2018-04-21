/*************************
 *name：product页面右侧，配送地址
 *date：2018/03/06
 *author：Liu Li
 *remarks：null
 */
function AddressMenuFn(_config){
    for(var i in _config){
        this[i] = _config[i]
    }
    this.arrs   =[];
    this.isShow = 0;
    this.init();
}
AddressMenuFn.prototype = {
    init: function(){
        var _self = this;
        _self.addrMenuEvent();
        _self.getData();
        _self.tabPvnEvent();
        _self.tabCtyEvent();
        _self.tabAreEvent();
    },
    // 地址列表的显示、隐藏
    addrMenuEvent: function(){
        var _self = this;
        _self.addressTitleId.on('click',function(){
            if(_self.isShow==0){
                _self.addressListId.show();
                _self.addrTitleUlId.attr('class','border arrOpen');
                _self.isShow = 1;
            } else if(_self.isShow==1){
                _self.addressListId.hide();
                _self.addrTitleUlId.attr('class','arrClose');
                _self.isShow = 0;
            }
        });
    },
    getData: function(){
        var _self = this;

        // 省级列表 json
        ajaxFn(APILIST.provinces,function(_dat){
            //console.log(_dat);
            _self.createDom(_dat.provinces,_self.provinceId);
            _self.provinceEvent();
        });

        // 市级列表 json
        ajaxFn(APILIST.cities,function(_dat){
            //console.log(_dat);
            _self.createDom(_dat.cities,_self.cityId);
            _self.cityEvent();
        });

        // 区级列表 json
        ajaxFn(APILIST.areas,function(_dat){
            //console.log(_dat);
            _self.createDom(_dat.areas,_self.areaId);
            _self.areaEvent();
        });
    },
    createDom: function(_d,_p){
        var _self = this;
        for(var i=0;i<_d.length;i++){
            $('<li/>')
                .html(_d[i].name)
                .appendTo(_p);
        }
    },
    // 省级子节点 点击事件
    provinceEvent: function(){
        var _self = this;
        _self.provinceId.children('li').on('click',function(){
            var _html = $(this).html();
            _self.tabPvn.html(_html);
            _self.addressArray(0,_html);

            _self.tabCty.show().html('请选择').addClass('yellowBorder')
                .siblings().removeClass('yellowBorder');

            _self.provinceId.hide();
            _self.cityId.show();
        });
    },
    // 市级子节点 点击事件
    cityEvent: function(){
        var _self = this;
        _self.cityId.children('li').on('click',function(){
            var _html = $(this).html();
            _self.tabCty.html(_html);
            _self.addressArray(1,_html);

            _self.tabAre.show().html('请选择').addClass('yellowBorder')
                .siblings().removeClass('yellowBorder');

            _self.cityId.hide();
            _self.areaId.show();
        });
    },
    // 区级子节点 点击事件
    areaEvent: function(){
        var _self = this;
        _self.areaId.children('li').on('click',function(){
            var _html = $(this).html();
            _self.tabAre.html(_html);
            _self.addressArray(2,_html);

            _self.addressListId.hide();
            _self.addrTitleUlId.attr('class','arrClose');
            _self.isShow = 0;

            // 把所选择的省市区显示到地址栏
            //console.log(_self.arrs.join(" "));
            _self.addrTitleUlId.children('li').html(_self.arrs.join(" "));
        });
    },
    // 在公共数组中，保存所选的省市区
    addressArray:function(_i,_d){
        var _self = this;
        _self.arrs[_i] = _d ;

        /*if(_self.arrs.length<3){
            _self.arrs.push(_d);
        }*/
    },
    // 省级的tab按钮点击事件
    tabPvnEvent: function(){
        var _self = this;
        _self.tabPvn.on('click',function(){
            _self.cityId.hide();
            _self.areaId.hide();
            _self.provinceId.show();
            $(this).addClass('yellowBorder')
                .siblings().removeClass('yellowBorder');
        })
    },
    // 市级的tab按钮点击事件
    tabCtyEvent: function(){
        var _self = this;
        _self.tabCty.on('click',function(){
            _self.areaId.hide();
            _self.provinceId.hide();
            _self.cityId.show();
            $(this).addClass('yellowBorder')
                .siblings().removeClass('yellowBorder');
        })
    },
    // 区级的tab按钮点击事件
    tabAreEvent: function(){
        var _self = this;
        _self.tabAre.on('click',function(){
            _self.provinceId.hide();
            _self.cityId.hide();
            _self.areaId.show();
            $(this).addClass('yellowBorder')
                .siblings().removeClass('yellowBorder');
        })
    }
};

new AddressMenuFn({
    addressTitleId: $('#addressTitleId'),
    addressListId: $('#addressListId'),
    addrTitleUlId: $('#addrTitleUlId'),

    provinceId: $('#provinceId'),
    cityId: $('#cityId'),
    areaId: $('#areaId'),

    tabPvn:$('#tabPvn'),
    tabCty:$('#tabCty'),
    tabAre:$('#tabAre')
});