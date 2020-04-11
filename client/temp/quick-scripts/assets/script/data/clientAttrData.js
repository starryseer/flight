(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/data/clientAttrData.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'a43b7jNFstJyKpW8X+aibBr', 'clientAttrData', __filename);
// script/data/clientAttrData.js

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var clientAttrData = function clientAttrData() {
    var that = {};
    that.client_id = null;
    that.diamond = null;
    that.fatigue = null;
    that.gold = null;
    that.mood = null;
    that.nickname = null;
    that.signature = null;

    that.initClientAttrData = function (clientAttr) {
        that.client_id = clientAttr.client_id;
        that.diamond = clientAttr.diamond;
        that.fatigue = clientAttr.fatigue;
        that.gold = clientAttr.gold;
        that.mood = clientAttr.mood;
        that.nickname = clientAttr.nickname;
        that.signature = clientAttr.signature;
    };

    return that;
};
exports.default = clientAttrData;
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
        //# sourceMappingURL=clientAttrData.js.map
        