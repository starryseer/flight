"use strict";
cc._RF.push(module, 'ffd21IWedNHDJhVf25w/m9C', 'block');
// script/miniGame/jumpBall/block.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {},

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        var _this = this;

        this.node.on('init', function (data) {
            var width = Math.random() * 100 + 250;
            _this.node.width = width;
            _this.node.getComponent(cc.PhysicsBoxCollider).width = width;
        });
    }
}

// update (dt) {},
);

cc._RF.pop();