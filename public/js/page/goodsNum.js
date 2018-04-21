/*************************
 *name：product页面右侧，商品数量加减
 *date：2018/03/07
 *author：Liu Li
 *remarks：null
 */
function GoodsNumFn(_config){
    for(var i in _config){
        this[i]=_config[i];
    }
    this.numVal = 1;
    this.init();
}
GoodsNumFn.prototype = {
    init: function(){
        var _self = this;

        _self.addBtnEvent();
        _self.minusBtnEvent();
        _self.intoCartEvent();
    },
    addBtnEvent: function(){
        var _self = this;
        //_self.numVal = _self.goodsNumTxtId.val();

        _self.addBtn.on('click',function(){
            getAjaxFn(APILIST.goodsNum,{val:_self.numVal,ops:'add'},function(_d){
                //console.log('点击加号后--'+_d.goodsNum);
                _self.numVal = _d.goodsNum;
                _self.goodsNumTxtId.val(_self.numVal);

                // 当商品数量大于1时，减号有效
                if(_self.numVal > 1){
                    _self.minusBtn.attr("disabled",false);
                }
            })
        })
    },
    minusBtnEvent: function(){
        var _self = this;

        _self.minusBtn.on('click',function(){
            getAjaxFn(APILIST.goodsNum,{val:_self.numVal,ops:'minus'},function(_d){
                //console.log('点击减号后--'+_d.goodsNum);
                _self.numVal = _d.goodsNum;
                _self.goodsNumTxtId.val(_self.numVal);

                // 当商品数量等于1时，减号无效
                if(_self.numVal == 1){
                    _self.minusBtn.attr("disabled",true);
                }
            })
        })
    },
    intoCartEvent:function(){
        var _self = this;
        _self.intoCartId.on('click',function(){
            location.href = 'http://localhost:5858/cart.html';
        })
    }
};

new GoodsNumFn({
    goodsNumTxtId: $('#goodsNumTxtId'),
    addBtn: $('#addBtn'),
    minusBtn: $('#minusBtn'),
    intoCartId: $('#intoCartId')
});