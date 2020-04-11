(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/data/itemData.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '65961fkXdpNBJrjFq8CO/un', 'itemData', __filename);
// script/data/itemData.js

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var itemData = function itemData() {
    var that = {};
    that.items = {};
    that.initItemData = function (items) {
        that.items = {};
        for (var index in items) {
            that.items[items[index]['id']] = items[index];
        }
    };
    return that;
};
exports.default = itemData;
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
        //# sourceMappingURL=itemData.js.map
        