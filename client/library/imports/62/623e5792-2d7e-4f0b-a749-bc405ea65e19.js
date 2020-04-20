"use strict";
cc._RF.push(module, '623e5eSLX5PC6dJvEBepl4Z', 'bag');
// script/home/bag/bag.js

'use strict';

var _global = require('./../../global/global');

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
        bagFrame: {
            default: null,
            type: cc.Node,
            tooltip: '背包框'
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        _global2.default.FitHelper.onEnable(this.bg);
        cc.systemEvent.on('bagShow', this.show, this);
    },
    onDestroy: function onDestroy() {
        cc.systemEvent.off('bagShow', this.show, this);
    },
    start: function start() {
        this.fade();
    },
    show: function show() {
        this.node.active = true;
        this.bagFrame.emit('init', {});
    },
    fade: function fade() {
        this.node.active = false;
    },
    onCloseClick: function onCloseClick(target, data) {
        this.fade();
    }
}

// update (dt) {},
);

cc._RF.pop();