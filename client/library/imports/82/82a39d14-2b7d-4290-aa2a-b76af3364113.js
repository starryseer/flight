"use strict";
cc._RF.push(module, '82a390UK31CkKoqt2rzNkET', 'computer2');
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