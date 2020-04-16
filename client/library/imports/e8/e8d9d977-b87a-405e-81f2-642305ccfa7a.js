"use strict";
cc._RF.push(module, 'e8d9dl3uHpAXoHyZCMFzPp6', 'submitFrame');
// script/shop/submitFrame.js

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
        fen: {
            default: null,
            type: cc.Label,
            tooltip: '份数'
        },
        total: {
            default: null,
            type: cc.Label,
            tooltip: '总数'
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        _global2.default.FitHelper.fitFun(this.bg);
        cc.systemEvent.on('submitShow', this.show, this);
    },
    onDestroy: function onDestroy() {
        cc.systemEvent.off('submitShow', this.show, this);
    },
    start: function start() {},
    show: function show(data) {
        this.node.setPosition(cc.v2(0, 0));
        this.fen.string = data;
        this.total.string = data * 100;
    },
    fade: function fade() {
        this.node.setPosition(cc.v2(1000, 0));
    },
    onCloseClick: function onCloseClick(target, data) {
        this.fade();
    },
    onSubmitClick: function onSubmitClick() {
        var _this = this;

        var param = { userId: _global2.default.userData.id, token: _global2.default.userData.token, type: this.fen.string, pool: 'drawBasic' };
        _global2.default.HttpHelper.httpPost(_global2.default.urlConf.shop_draw, param, function (rsp) {
            if (rsp == -1) {
                return;
            }

            if (rsp.code == 200) {
                _global2.default.clientAttrData.initClientAttrData(rsp.data.clientAttr);
                _global2.default.itemData.update(rsp.data.get);
                _global2.default.itemData.update(rsp.data.consume);
                _this.fade();
                cc.systemEvent.emit('getShow', rsp.data.show);
            } else {
                return;
            }
        });
    }
}

// update (dt) {},
);

cc._RF.pop();