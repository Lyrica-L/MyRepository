/******************
 *name：全局的配置项
 *date：2018/02/07
 *author：Liu Li
 *remarks：null
 */
// 保持数据来源的一致性。

var topSearchVal    = "输入商品名称";

// 端口号
var _port           = 4801;
var _cartPort       = 4802;

// 服务器网址
var SITE_URL        = 'http://localhost:'+_port;
var SITE_URL_CART   = 'http://localhost:'+_cartPort;

// 接口-对象（全局）
var APILIST = {
    oneapi:'http://www.webfeel.org/zuoye/php/oneapi.php',
    // 本地假数据，0228弃用
    //columnNavJson:'/js/data/columnNavJson.js',
    columnNavJson: SITE_URL+'/index/columnNavJson',
    subNavJson: SITE_URL+'/index/subNavJson',
    sliderJson: SITE_URL+'/index/sliderJson',
    goodsJson: SITE_URL+'/index/goodsJson',

    imgList: SITE_URL+'/product/imgList',
    goodsids: SITE_URL+'/product/goodsids',

    provinces: SITE_URL+'/product/provinces',
    cities: SITE_URL+'/product/cities',
    areas: SITE_URL+'/product/areas',

    goodsNum: SITE_URL+'/product/goodsNum'
};

var APILIST_CART = {
    cartList: SITE_URL_CART+'/cart/cartList',
    cart_add: SITE_URL_CART+'/cart/cart_add',
    cart_minus: SITE_URL_CART+'/cart/cart_minus',
    cart_text: SITE_URL_CART+'/cart/cart_text',
    cart_total: SITE_URL_CART+'/cart/cart_total'
};