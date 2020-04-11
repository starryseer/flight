"use strict";
cc._RF.push(module, 'cebefVqpMVHP7zvCMaxyuiJ', 'smallFrame');
// script/miniGame/miniMain/smallFrame.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {},

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start: function start() {},
    onFrameClick: function onFrameClick(target, data) {
        cc.director.loadScene('jumpBall');
    }

    // update (dt) {},

});

cc._RF.pop();