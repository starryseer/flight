(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/data/userData.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '4fa1e7PvBxLa74k1spZFLL0', 'userData', __filename);
// script/data/userData.js

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var userData = function userData() {
    var that = {};
    that.id = null;
    that.token = null;

    that.initUserData = function (user) {
        that.id = user.id;
        that.token = user.token;
    };

    return that;
};
exports.default = userData;
module.exports = exports["default"];

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
        //# sourceMappingURL=userData.js.map
        