"use strict";
cc._RF.push(module, 'cf2ebNL5cdDoL68A0PFxS8x', 'mainCamera');
// script/home/mainCamera.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        player: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    update: function update(dt) {
        this.node.x = this.player.x;
    }
});

cc._RF.pop();