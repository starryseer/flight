"use strict";
cc._RF.push(module, 'e2e12QiovVITq0KzAX9X0YE', 'playerClick');
// script/home/player/playerClick.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        infoBg: {
            default: null,
            type: cc.Node,
            tooltip: '个人信息'
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {},
    start: function start() {
        this.infoBg.active = false;
    },
    onPlayerClick: function onPlayerClick(target, data) {
        this.infoBg.active = true;
        this.infoBg.emit('init', {});
    }
}

// update (dt) {},
);

cc._RF.pop();