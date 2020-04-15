"use strict";
cc._RF.push(module, '4e9b84xJ9hDIbMoBf7axhcr', 'nickname');
// script/miniGame/miniInit/nickname.js

'use strict';

var _global = require('./../../global/global');

var _global2 = _interopRequireDefault(_global);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

cc.Class({
    extends: cc.Component,

    properties: {
        headBoxLab: {
            default: null,
            type: cc.Label,
            tooltip: '文本框'
        },
        headBoxBg: {
            default: null,
            type: cc.Node,
            tooltip: '文本框背景'
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {},
    editBegin: function editBegin(target, data) {
        this.headBoxBg.active = false;
    },
    editChange: function editChange(target, data) {
        _global2.default.miniInitCache.setNickname(this.headBoxLab.string);
    },
    editEnd: function editEnd(target, data) {
        if (this.headBoxLab.string) {
            this.headBoxBg.active = false;
        } else {
            this.headBoxBg.active = true;
        }
    },
    onButtonClick: function onButtonClick(target, data) {
        if (!this.headBoxLab.string) return;

        cc.systemEvent.emit('miniInit', 1);
    }

    // update (dt) {},

});

cc._RF.pop();