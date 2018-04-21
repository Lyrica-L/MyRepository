/************************
 *name：input插件
 *date：2018/03/14
 *author：Liu Li
 *remarks：null
 */
$.fn.extend({
    checkPlus:function(_fns){
        this.on('click',function(){
            // 此处的this，在插件中指向dom节点；如要对它使用jq方法，需要用$(this)。
            //console.log('ok ok ok');
            var _self = $(this);
            var _isCheck = _self.attr('data-ischeck');
            if(_isCheck == 0){
                _self.removeClass('plus_checkbox_0').addClass('plus_checkbox_1');
                _self.attr('data-ischeck',1);
            } else {
                _self.removeClass('plus_checkbox_1').addClass('plus_checkbox_0');
                _self.attr('data-ischeck',0);
            }
            // 复选框状态改变后需要执行的事件、方法
            _fns();
        })
    }
});