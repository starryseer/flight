const urlConf = function(){
    let that = {};
    that.sdk_url = 'http://139.224.25.229:9502';
    that.game_url = 'http://139.224.25.229:9503';
    that.sdk_login = that.sdk_url + '/accountLogin';
    that.game_login = that.game_url + '/client_login';
    that.clientAttr = that.game_url + '/clientAttr';
    that.set_nickname = that.game_url + '/clientAttr_nickname';
    that.set_signature = that.game_url + '/clientAttr_signature';
    that.mini_main = that.game_url + '/mini_index';
    that.mini_play = that.game_url + '/mini_play';
    that.mini_rank = that.game_url + '/mini_rank';
    that.shop_draw = that.game_url + '/shop_draw';
    that.item_sale = that.game_url + '/item_sale';
    that.item_consume = that.game_url + '/item_consume';
    return that;
};
export default urlConf;