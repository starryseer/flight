"use strict";
cc._RF.push(module, '79f60v0GetA5oSms4cp50F/', 'main');
// script/shop/main.js

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
        num: {
            default: null,
            type: cc.Label,
            tooltip: '数量'
        },
        gold: {
            default: null,
            type: cc.Label,
            tooltip: '金币'
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        _global2.default.FitHelper.fitFun(this.bg);
        this.init();
        cc.systemEvent.on('mainInit', this.init, this);
    },
    onDestroy: function onDestroy() {
        cc.systemEvent.off('mainInit', this.init, this);
    },
    start: function start() {
        var _this = this;

        var param = { userId: _global2.default.userData.id, token: _global2.default.userData.token };
        _global2.default.HttpHelper.httpPost(_global2.default.urlConf.clientAttr, param, function (rsp) {
            if (rsp == -1) {
                return;
            }

            if (rsp.code == 200) {
                _global2.default.clientAttrData.initClientAttrData(rsp.data.clientAttr);
                _this.init();
            } else {
                return;
            }
        });
    },
    init: function init() {
        this.gold.string = _global2.default.clientAttrData.gold;
    },
    onBackClick: function onBackClick(target, data) {
        cc.director.loadScene('home');
    },
    onPlusClick: function onPlusClick(target, data) {
        var num = parseInt(this.num.string);
        if (num < 9) {
            num++;
            this.num.string = num;
        }
    },
    onMinusClick: function onMinusClick(target, data) {
        var num = parseInt(this.num.string);
        if (num > 1) {
            num--;
            this.num.string = num;
        }
    },
    onBuyClick: function onBuyClick(target, data) {
        cc.systemEvent.emit('submitShow', parseInt(this.num.string));
    },
    onBuyTenClick: function onBuyTenClick(target, data) {
        cc.systemEvent.emit('submitShow', 10);
    }
}

// update (dt) {},
);

cc._RF.pop();