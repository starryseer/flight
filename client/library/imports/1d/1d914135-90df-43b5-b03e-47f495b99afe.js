"use strict";
cc._RF.push(module, '1d914E1kN9DtbA+R/SVuZr+', 'homeItemInfo');
// script/home/prefab/homeItemInfo.js

'use strict';

var _global = require('./../../global/global');

var _global2 = _interopRequireDefault(_global);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

cc.Class({
    extends: cc.Component,

    properties: {
        infoFrame: {
            default: null,
            type: cc.Node,
            tooltip: '框'
        },
        bg: {
            default: null,
            type: cc.Node,
            tooltip: '背景'
        },
        nameLab: {
            default: null,
            type: cc.Label,
            tooltip: '名称'
        },
        infoLab: {
            default: null,
            type: cc.Label,
            tooltip: '信息'
        },
        buttonPrefab: {
            default: null,
            type: cc.Prefab,
            tooltip: '按钮'
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this.node.on('init', this.init, this);
    },
    start: function start() {
        this.infoFrame.on('touchstart', this.infoTouch, this);

        this.bg.on('touchstart', this.bgTouch, this);
        if (this.bg._touchListener) {
            this.bg._touchListener.setSwallowTouches(this._isSwallow);
        }
    },
    bgTouch: function bgTouch(event) {
        cc.systemEvent.emit('fadeInfo', {});
    },
    infoTouch: function infoTouch(event) {
        cc.systemEvent.emit('fadeInfo', {});
        event.stopPropagation();
    },
    init: function init(data) {
        var btnPos = { 1: [cc.v2(162, -116)], 2: [cc.v2(81, -116), cc.v2(223, -116)] };
        var itemConf = _global2.default.configConf['item'][data['item_id']];
        this.nameLab.string = itemConf['name'];
        this.infoLab.string = itemConf['info'];
        var button = {};
        var buttonLen = 0;
        if (itemConf['use']) {
            button['use'] = itemConf['use'];
            buttonLen++;
        }

        if (itemConf['cook']) {
            button['cook'] = itemConf['cook'];
            buttonLen++;
        }

        if (itemConf['eat']) {
            button['eat'] = itemConf['eat'];
            buttonLen++;
        }

        if (itemConf['sale']) {
            button['sale'] = itemConf['sale'];
            buttonLen++;
        }

        var num = 0;
        for (var key in button) {
            var btn = cc.instantiate(this.buttonPrefab);
            btn.parent = this.infoFrame;
            btn.setPosition(btnPos[buttonLen][num]);
            btn.emit('init', { 'type': key, 'id': data['id'] });
            num++;
        }
    }

    // update (dt) {},

});

cc._RF.pop();