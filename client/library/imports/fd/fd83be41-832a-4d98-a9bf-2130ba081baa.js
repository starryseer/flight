"use strict";
cc._RF.push(module, 'fd83b5BgypNmKm/ITC6CBuq', 'miniMain');
// script/miniGame/miniMain/miniMain.js

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
        title: {
            default: null,
            type: cc.Node,
            tooltip: '标题栏'
        },
        userInfo: {
            default: null,
            type: cc.Node,
            tooltip: '用户信息栏'
        },
        rankList: {
            default: null,
            type: cc.Node,
            tooltip: '排名栏'
        },
        editFrame: {
            default: null,
            type: cc.Node,
            tooltip: '编辑框'
        },
        rankFrame: {
            default: null,
            type: cc.Node,
            tooltip: '排名框'
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        if (!_global2.default.clientAttrData.nickname) {
            cc.director.loadScene('miniInit');
            return;
        }
        _global2.default.FitHelper.fitFun(this.bg);
    },
    start: function start() {
        var _this = this;

        var param = { userId: _global2.default.userData.id, token: _global2.default.userData.token };
        _global2.default.HttpHelper.httpPost(_global2.default.urlConf.mini_main, param, function (rsp) {
            if (rsp == -1) {
                return;
            }

            if (rsp.code == 200) {
                _this.initData(rsp);
                _this.initLab();
            } else {
                return;
            }
        });
    },
    onDestroy: function onDestroy() {},
    initData: function initData(rsp) {
        _global2.default.clientAttrData.initClientAttrData(rsp.data.clientAttr);
        _global2.default.miniGameData.initMiniGameData(rsp.data.miniGame);
    },
    initLab: function initLab() {
        this.title.emit('update', {});
        this.rankList.emit('update', {});
        this.userInfo.emit('update', {});
    }

    // update (dt) {},

});

cc._RF.pop();