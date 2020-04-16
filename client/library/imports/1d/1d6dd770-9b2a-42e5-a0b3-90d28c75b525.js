"use strict";
cc._RF.push(module, '1d6dddwmypC5aCzkNKMdbUl', 'getFrame');
// script/shop/getFrame.js

'use strict';

var _global = require('./../global/global');

var _global2 = _interopRequireDefault(_global);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

cc.Class({
    extends: cc.Component,

    properties: {
        bg: {
            default: null,
            type: cc.Node,
            tooltip: '背景'
        },
        layout: {
            default: null,
            type: cc.Node,
            tooltip: '显示框'
        },
        item: {
            default: null,
            type: cc.Prefab,
            tooltip: '道具预制体'
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        _global2.default.FitHelper.onEnable(this.bg);
        cc.systemEvent.on('getShow', this.show, this);
    },
    onDestroy: function onDestroy() {
        cc.systemEvent.off('getShow', this.show, this);
    },
    show: function show(data) {
        this.node.setPosition(cc.v2(0, 0));
        this.layout.removeAllChildren();
        for (var index in data) {
            var item = cc.instantiate(this.item);
            item.parent = this.layout;
            item.emit('init', data[index]);
            item.opacity = 0;
            item.runAction(cc.sequence(cc.delayTime(index / 10), cc.fadeIn(0.1)));
        }
        cc.systemEvent.emit('mainInit', {});
    },
    fade: function fade() {
        this.node.setPosition(cc.v2(2000, 0));
    },
    onCloseClick: function onCloseClick(target, data) {
        this.fade();
    }
}

// update (dt) {},
);

cc._RF.pop();