"use strict";
cc._RF.push(module, '2d1cf55vjZKuqzmf3SIZT6m', 'bagFrame');
// script/home/bag/bagFrame.js

'use strict';

var _global = require('../../global/global');

var _global2 = _interopRequireDefault(_global);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

cc.Class({
    extends: cc.Component,

    properties: {
        matter: {
            default: null,
            type: cc.Node,
            tooltip: '食材框'
        },
        food: {
            default: null,
            type: cc.Node,
            tooltip: '食物框'
        },
        item: {
            default: null,
            type: cc.Node,
            tooltip: '道具框'
        },
        itemParent: {
            default: null,
            type: cc.Node,
            tooltip: '信息框'
        },
        infoPrefab: {
            default: null,
            type: cc.Prefab,
            tooltip: '信息框'
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        _global2.default.FitHelper.fitUnit(this.node);
    },
    start: function start() {
        this.node.on('init', this.init, this);
        cc.systemEvent.on('showInfo', this.showInfo, this);
        cc.systemEvent.on('fadeInfo', this.fadeInfo, this);
        cc.systemEvent.on('showDealFrame', this.showDealFrame, this);
        this.init();
    },
    init: function init() {
        this.matter.emit('init', {});
        this.food.emit('init', {});
        this.item.emit('init', {});
        this.itemParent.removeAllChildren();
    },
    onDestroy: function onDestroy() {
        cc.systemEvent.off('showInfo', this.showInfo, this);
        cc.systemEvent.off('fadeInfo', this.fadeInfo, this);
        cc.systemEvent.off('showDealFrame', this.showDealFrame, this);
    },
    showInfo: function showInfo(data) {
        this.fadeInfo();
        var info = cc.instantiate(this.infoPrefab);
        info.parent = this.itemParent;
        info.setPosition(data['pos']);
        info.emit('init', data);
    },
    fadeInfo: function fadeInfo() {
        this.itemParent.removeAllChildren();
    },
    showDealFrame: function showDealFrame(data) {},
    onButtonClick: function onButtonClick(target, data) {
        switch (parseInt(data)) {
            case 1:
                this.matter.emit('btnTouch', {});
                this.food.emit('fade', {});
                this.item.emit('fade', {});
                break;
            case 2:
                this.matter.emit('fade', {});
                this.food.emit('btnTouch', {});
                this.item.emit('fade', {});
                break;
            case 3:
                this.matter.emit('fade', {});
                this.food.emit('fade', {});
                this.item.emit('btnTouch', {});
                break;
        }
    }
}

// update (dt) {},
);

cc._RF.pop();