(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/helper/FitHelper.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'd0d44RqjXFCiYfS0EEf0WXp', 'FitHelper', __filename);
// script/helper/FitHelper.js

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var FitHelper = function FitHelper() {
    var that = {};
    that.fitFun = function (target) {
        // 1. 先找到 SHOW_ALL 模式适配之后，本节点的实际宽高以及初始缩放值
        var srcScaleForShowAll = Math.min(cc.view.getCanvasSize().width / target.width, cc.view.getCanvasSize().height / target.height);
        var realWidth = target.width * srcScaleForShowAll;
        var realHeight = target.height * srcScaleForShowAll;

        // 2. 基于第一步的数据，再做缩放适配
        var ratio = Math.max(cc.view.getCanvasSize().width / realWidth, cc.view.getCanvasSize().height / realHeight);
        target.scale = ratio;
        return ratio;
    };

    return that;
};
exports.default = FitHelper;
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
        //# sourceMappingURL=FitHelper.js.map
        