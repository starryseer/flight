"use strict";
cc._RF.push(module, 'cbba0p29yNKkr+8vNMhw1oN', 'urlConf');
// script/config/urlConf.js

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var urlConf = function urlConf() {
    var that = {};
    that.sdk_url = 'http://139.224.25.229:9502';
    that.game_url = 'http://139.224.25.229:9503';
    that.sdk_login = that.sdk_url + '/accountLogin';
    that.game_login = that.game_url + '/client_login';
    that.mini_main = that.game_url + '/mini_index';
    that.mini_play = that.game_url + '/mini_play';
    that.mini_rank = that.game_url + '/mini_rank';
    return that;
};
exports.default = urlConf;
module.exports = exports['default'];

cc._RF.pop();