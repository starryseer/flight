"use strict";
cc._RF.push(module, 'b238cFwqb5OnLPlkIEEzZ7c', 'confirmFrame');
// script/home/prefab/confirmFrame.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        gainLab: {
            default: null,
            type: cc.Label,
            tooltip: '标签'
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this.node.on('init', this.init, this);
    },
    start: function start() {},
    init: function init(data) {
        this.gainLab.string = data['gold'];
    },
    onButtonClick: function onButtonClick(target, data) {
        this.node.destroy();
    }
}

// update (dt) {},
);

cc._RF.pop();