/************************
 *name：整个项目的入口文件
 *date：2018/02/07
 *author：Liu Li
 *remarks：null
 */

$(function(){

    // 首页左侧产品导航 subNavId
    //createSubNavMenuFn();
    new CreateSubNavMenuFn($('#subNavId'));

    // 首页 轮播图
    //sliderWrapFn();
    new SliderWrapFn({
        ulId: $('#ulId'),
        pointBtnId: $('#pointBtnId'),
        sliderPWId: $('#sliderPWId'),
        sliderPWBgId: $('#sliderPWBgId'),
        leftBtnId: $('#leftBtnId'),
        rightBtnId: $('#rightBtnId')
    });

    // 首页-享品质产品列表
    new GoodsWrapFn($('#goodsListId'));
});