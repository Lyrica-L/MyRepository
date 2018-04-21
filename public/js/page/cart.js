/******************
 *name：购物车页面的JS文件
 *date：2018/03/09
 *author：Liu Li
 *remarks：0314使用插件之前的版本
 */

function ShoppingCartFn(_config){
    for(var i in _config){
        this[i]=_config[i]
    }

    this.init();
}
ShoppingCartFn.prototype = {
    init: function(){
        var _self = this;
        _self.getData();
    },
    getData: function(){
        var _self = this;
        ajaxFn(APILIST_CART.cartList,function(_d){
            if(_d.error.code != 0){
                console.log(_d.error.msg);
                return false;
            }
            //console.log(_d);
            _self.createDom(_d.cartList);
            _self.totalNumId.html(_d.total.totalNum);
            _self.selectedNumId.html(_d.total.selected);
            _self.totalPriceId.html('￥'+_d.total.price);
        })
    },
    createDom: function(_arr){
        var _self = this;
        _self.cartMainWrapId.html(cartTplFn(_arr));

        // 加号点击
        _self.addBtnEvent();
        // 减号点击
        _self.minusBtnEvent();
        // 输入框直接输入数量
        _self.inputTxtEvent();

        // checkbox事件 执行 
        _self.checkboxEvent();

        // 删除按钮的点击事件
        _self.delBtnEvent();
        // 全选框按钮事件
        _self.checkAllBtnEvent();

    },
    // 获取单个商品的节点、数量、单价，供加减按钮及输入框使用
    getGoodsInfo: function(_clickDom,_act){
        var _self      = this,
            _goodsWrap = _clickDom.parents('.goodsWrap'),
            _minusBtn  = _goodsWrap.find('input.minusNumBtn'),
            _checkData = _goodsWrap.find('.checkData'),
            _num       = _checkData.attr('data_num'),
            _unitPrice = _checkData.attr('data_price'),
            _apiUrl    ='';

        if(_act == 'add'){
            _apiUrl    = APILIST_CART.cart_add;
        } else if(_act == 'minus'){
            _apiUrl    = APILIST_CART.cart_minus;
        } else if(_act == 'textVal'){
            _num       = _clickDom.val();
            _apiUrl    = APILIST_CART.cart_text;
        }

        // 加减数量时，更新页面上的信息
        getAjaxFn(_apiUrl,{n:_num,unitPrice:_unitPrice},function(_d){
            _goodsWrap.find('.goodsNumTxt').val(_d.num);
            _checkData.attr('data_num',_d.num);
            _goodsWrap.find('.subtotal').html('￥'+_d.result);

            // 更新商品的汇总信息
            _self.totalCount();

            // 更新减号按钮的状态
            if(_d.num <=1){
                _minusBtn.attr('disabled',true);
            } else {
                _minusBtn.removeAttr('disabled');
            }
        })
    },

    // 加号按钮事件
    addBtnEvent: function(){
        var _self = this;
        $('.addNumBtn').on('click',function(){
            _self.getGoodsInfo($(this),'add');
        })
    },
    // 减号按钮事件
    minusBtnEvent: function(){
        var _self = this;
        $('.minusNumBtn').on('click',function(){
            _self.getGoodsInfo($(this),'minus');
        })
    },
    // 输入框事件
    inputTxtEvent: function(){
        var _self = this;
        $('.goodsNumTxt').on('blur',function(){
            _self.getGoodsInfo($(this),'textVal');
        })
    },

    // checkbox事件 
    checkboxEvent: function(){
        var _self           = this;
        var _cartMainCheck  = _self.cartMainWrapId.find('input.checkData');
        _cartMainCheck.on('click',function(){
            _self.totalCount();
            // 更新全选框的状态
            _self.checkboxStatus();
        })
    },
    // 删除按钮的点击事件（因为没有数据库，先在dom层面实现操作
    delBtnEvent: function(){
        var _self       = this;
        var _delBtn     = _self.cartMainWrapId.find('li.delBtn');
        _delBtn.on('click',function(){
            $(this).parents('div.goodsWrap').remove();
            // 移除单项商品后重新计算汇总
            _self.totalCount();
            // 更新全选框的状态
            _self.checkboxStatus();
        })
    },

    // 商品合计数量、总价
    totalCount: function(){
        var _self           = this;
        var _cartMainCheck  = _self.cartMainWrapId.find('input.checkData');
        var _totalSelected  = {"arrData":[]};
        var _obj            ='';

        // 如果删除了全部商品，即找不到商品的DOM节点
        if(_cartMainCheck.length == 0){
            _self.cartMainWrapId.html('<h1 class="cartEmpty">购物车内暂时没有商品，请前往添加！</h1>');
        } else {
            for(var i=0;i<_cartMainCheck.length;i++){
                // 找得到商品，且是选中状态
                if(_cartMainCheck.eq(i).is(':checked')){
                    _obj = {
                        n: Number(_cartMainCheck.eq(i).attr('data_num')),
                        unitPrice: Number(_cartMainCheck.eq(i).attr('data_price'))
                    };
                    _totalSelected.arrData.push(_obj);
                }
            }
        }

        // 如果没有商品被选中
        if(_totalSelected.arrData.length == 0){
            _obj = {
                n: 0,
                unitPrice: 0
            };
            _totalSelected.arrData.push(_obj);
        }

        //console.log(_totalSelected);
        getAjaxFn(APILIST_CART.cart_total,_totalSelected,function(_d){
            _self.selectedNumId.html(_d.tNum);
            _self.totalPriceId.html('￥'+_d.totalPrice);
        });

        // 更新全部商品后面的数字
        //console.log(_cartMainCheck.length);
        _self.totalNumId.html(_cartMainCheck.length);
    },
    // 更新全选框的状态
    checkboxStatus: function(){
        var _self = this;
        var _cartMainCheck  = _self.cartMainWrapId.find('input.checkData');

        if(_cartMainCheck.length <= 0){
            // 当商品全部删除时，去掉全选勾
            _self.checkAllBtn.removeAttr('checked');
        } else{
            for(var i=0;i<_cartMainCheck.length;i++){
                if(_cartMainCheck.eq(i).is(':checked') == false){
                    _self.checkAllBtn.removeAttr('checked');
                    break;
                }
                _self.checkAllBtn.attr('checked',true);
            }
        }
    },

    // 全选框按钮事件
    checkAllBtnEvent: function(){
        var _self = this;
        var _cartMainCheck  = _self.cartMainWrapId.find('input.checkData');
        _self.checkAllBtn.on('click',function(){
            // 点击后判断当前全选框的状态
            if($(this).is(':checked')){
                _cartMainCheck.attr('checked',true);
                _self.checkAllBtn.attr('checked',true);
            } else {
                _cartMainCheck.removeAttr('checked');
                _self.checkAllBtn.removeAttr('checked');
            }
            _self.totalCount();
        })
    },

    // 复选框插件
    /*plusCheckFn: function(){
        var _self = this;
        var _plusCheck  = _self.cartMainWrapId.find('div.plus_input');

        _plusCheck.checkPlus(function(){
            // 更新总计
            _self.totalCount();
            // 更新全选框的状态
            _self.checkboxStatus();
        });
    }*/
};

new ShoppingCartFn({
    cartMainWrapId: $('#cartMainWrapId'),
    totalNumId: $('#totalNumId'),
    selectedNumId: $('#selectedNumId'),
    totalPriceId: $('#totalPriceId'),
    checkAllBtn: $('.checkAllBtn')
});