"use strict";
cc._RF.push(module, '87ffcvB8nFKRZJIhp/TyQ1H', 'gameboy');
// script/home/trigger/gameboy.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        light: {
            default: null,
            type: cc.Node,
            tooltip: '屏幕亮暗'
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        var _this = this;

        this.light.active = false;
        this.node.on('trigger', function (flag) {
            if (flag) {
                _this.light.active = true;
            } else {
                _this.light.active = false;
            }
        });
    },
    start: function start() {}
}

// update (dt) {},
);

cc._RF.pop();