/*************************
 *name：product页面右侧，根据产品ID显示详情
 *date：2018/03/06
 *author：Liu Li
 *remarks：null
 */
// 右侧产品信息 构造器
function GoodsInfoWrapFn(_config){
    for(var i in _config){
        this[i]=_config[i]
    }
    this.init();
}
GoodsInfoWrapFn.prototype = {
    init: function(){
        var _self = this;
        _self.getParam();
    },
    getParam: function(){
        var _self = this;
        var _url = location.href;
        var _num = _url.indexOf('?');
        var _param = _url.substring(_num+5);
        //console.log(_str);
        getAjaxFn(APILIST.goodsids,{_ids:_param},function(_dat){
            _self.goodsTitleId.html(_dat.title);
            _self.createDom(_dat.promotions);
        });
    },
    createDom: function(_d){
        var _self = this;
        for(var i=0;i<_d.length;i++){
            $('<li/>').html(_d[i]).appendTo(_self.goodsInfoId);
        }
    }
};

new GoodsInfoWrapFn({
    goodsTitleId: $('#goodsTitleId'),
    goodsInfoId: $('#goodsInfoId')
});