(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/home/trigger/computer2.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '82a390UK31CkKoqt2rzNkET', 'computer2', __filename);
// script/home/trigger/computer2.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        Frame: {
            default: [],
            type: cc.SpriteFrame,
            tooltip: '电脑屏幕开关图片'
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        var _this = this;

        this.node.on('trigger', function (flag) {
            if (flag) {
                _this.node.getComponent(cc.Sprite).spriteFrame = _this.Frame[0];
            } else {
                _this.node.getComponent(cc.Sprite).spriteFrame = _this.Frame[1];
            }
        });
    },
    start: function start() {}
}

// update (dt) {},
);

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
        //# sourceMappingURL=computer2.js.map
        