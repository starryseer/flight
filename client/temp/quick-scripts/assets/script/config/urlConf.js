(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/config/urlConf.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'cbba0p29yNKkr+8vNMhw1oN', 'urlConf', __filename);
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
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=urlConf.js.map
        