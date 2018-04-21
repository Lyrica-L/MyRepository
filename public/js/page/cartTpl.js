/******************
 *name：购物车列表 template
 *date：2018/03/09
 *author：Liu Li
 *remarks：null
 */
function cartTplFn(_arr){
    var _html = '';
    _html +='<div class="blackLine"></div>';
    for(var i=0;i<_arr.length;i++){
        _html +='<div class="goodsWrap">';
            _html +='<ul>';
                _html +='<li class="gwli_1">';
                    _html +='<input class="checkData" type="checkbox" id="chBox_1" data_price='+
                        _arr[i].unitPrice+' data_num='+_arr[i].num+' checked>';
                    /*_html +='<div class="plus_input plus_checkbox_1" data-ischeck='+_arr[i].isCheck+' data_price='+
                        _arr[i].unitPrice+' data_num='+_arr[i].num+'></div>';*/
                    _html +='<img src='+_arr[i].imgurl+'>';
                _html +='</li>';
                _html +='<li class="gwli_2">'+_arr[i].introduction+'</li>';
                _html +='<li class="gwli_3">￥'+_arr[i].unitPrice+'</li>';
                _html +='<li class="gwli_4">';
                    _html +='<div class="editGoodsNum">';
                        _html +='<input class="a minusNumBtn" type="button" value="-">';
                        _html +='<input class="b goodsNumTxt" type="text" value='+_arr[i].num+'>';
                        _html +='<input class="c addNumBtn" type="button" value="+">';
                    _html +='</div>';
                _html +='</li>';
                _html +='<li class="gwli_5 subtotal">￥'+_arr[i].subtotal+'</li>';
                _html +='<li class="gwli_6 delBtn">删除</li>';
            _html +='</ul>';
        _html +='</div>';
    }

    return _html;
}