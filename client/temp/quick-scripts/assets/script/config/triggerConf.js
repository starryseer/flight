(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/config/triggerConf.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'fede6PmPphEuqusEf5eOB0H', 'triggerConf', __filename);
// script/config/triggerConf.js

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var triggerConf = function triggerConf() {
    var that = {};
    //"frame"弹框预制体图  "other"触发其他道具变化 null无其他触发  "framePos"位置   "scene" 功能跳转页面   "framePrefab"   预制体名称    "otherName"触发其他道具名称
    that[0] = { "frame": 0, "other": 0, "framePos": { "x": 10, "y": 30 }, "scene": "miniMain", "framePrefab": "computerPlay", "otherName": "computerBox2" };
    return that;
};
exports.default = triggerConf;
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
        //# sourceMappingURL=triggerConf.js.map
        