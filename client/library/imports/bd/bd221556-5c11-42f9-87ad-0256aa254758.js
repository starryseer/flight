"use strict";
cc._RF.push(module, 'bd221VWXBFC+YetAlaqJUdY', 'login');
// script/login/login.js

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
        account: {
            default: null,
            type: cc.EditBox,
            tooltip: '背景'
        }, // 账号
        password: {
            default: null,
            type: cc.EditBox,
            tooltip: '背景'
        }, // 密码
        start_btn: {
            default: null,
            type: cc.Node,
            tooltip: '背景'
        } // 开始按钮
    },

    onLoad: function onLoad() {
        _global2.default.FitHelper.fitFun(this.bg);
    },
    start: function start() {},
    startClick: function startClick() {
        var account = this.account.string;
        var password = this.password.string;
        var param = { account: account, password: password, deviceType: 'ios', plat: 10, udid: 123 };
        this.loginSDK(param);
    },
    loginSDK: function loginSDK(param) {
        var _this = this;

        _global2.default.HttpHelper.httpPost(_global2.default.urlConf.sdk_login, param, function (rsp) {
            if (rsp == -1) {
                return;
            }

            if (rsp.code == 200) {
                _global2.default.userData.initUserData(rsp.data.user);
                _this.loginGame();
            } else {
                return;
            }
        });
    },
    loginGame: function loginGame() {
        var param = { userId: _global2.default.userData.id, token: _global2.default.userData.token };
        _global2.default.HttpHelper.httpPost(_global2.default.urlConf.game_login, param, function (rsp) {
            if (rsp == -1) {
                return;
            }

            if (rsp.code == 200) {
                _global2.default.clientData.initClientData(rsp.data.client);
                _global2.default.clientAttrData.initClientAttrData(rsp.data.clientAttr);
                _global2.default.itemData.initItemData(rsp.data.item);
                cc.director.loadScene('home');
            } else {
                return;
            }
        });
    },
    update: function update(dt) {}
});

cc._RF.pop();