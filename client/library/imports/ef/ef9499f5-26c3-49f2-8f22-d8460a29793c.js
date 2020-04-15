"use strict";
cc._RF.push(module, 'ef949n1JsNJ8o8i2EYKKXk8', 'editFrame');
// script/miniGame/miniMain/editFrame.js

'use strict';

var _global = require('./../../global/global');

var _global2 = _interopRequireDefault(_global);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

cc.Class({
    extends: cc.Component,

    properties: {
        nicknameLab: {
            default: null,
            type: cc.Label,
            tooltip: '昵称'
        },
        signatureBoxLab: {
            default: null,
            type: cc.Label,
            tooltip: '个性签名'
        },
        signatureEditBoxLab: {
            default: null,
            type: cc.EditBox,
            tooltip: '个性签名'
        },
        bg: {
            default: null,
            type: cc.Node,
            tooltip: '背景'
        },
        avatarLayout: {
            default: null,
            type: cc.Node,
            tooltip: '头像选择框'
        },
        avatarPrefab: {
            default: null,
            type: cc.Prefab,
            tooltip: '头像预制体'
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        var _this = this;

        _global2.default.FitHelper.onEnable(this.node);
        _global2.default.FitHelper.fitFun(this.bg);
        this.init();

        this.node.on('show', function (data) {
            _this.show();
            _this.initData();
        });

        this.node.on('fade', function (data) {
            _this.fade();
        });
    },
    init: function init() {
        this.initData();
        this.fade();
    },
    initData: function initData() {
        this.nicknameLab.string = _global2.default.clientAttrData.nickname;
        this.signatureBoxLab.string = _global2.default.clientAttrData.signature;
        this.signatureEditBoxLab.string = _global2.default.clientAttrData.signature;
        this.avatarLayout.removeAllChildren();
        for (var index in _global2.default.imageConf.avatar) {
            var avatar = cc.instantiate(this.avatarPrefab);
            avatar.parent = this.avatarLayout;
            avatar.emit('init', index);
        }
    },
    show: function show() {

        this.node.setPosition(cc.v2(0, 0));
    },
    fade: function fade() {
        //global.FitHelper.onDisable();
        this.node.setPosition(cc.v2(2000, 0));
    },
    onButtonClick: function onButtonClick(target, data) {
        var _this2 = this;

        var children = this.avatarLayout.children;
        var avatar = -1;
        for (var index in children) {
            if (children[index].getComponent('avatar').chosen.active) {
                avatar = index;
                break;
            }
        }

        var param = {
            signature: this.signatureBoxLab.string,
            userId: _global2.default.userData.id,
            token: _global2.default.userData.token,
            avatar: avatar
        };
        _global2.default.HttpHelper.httpPost(_global2.default.urlConf.set_signature, param, function (rsp) {
            if (rsp.code == 200) {
                _global2.default.clientAttrData.initClientAttrData(rsp.data.clientAttr);
                cc.systemEvent.emit('updateUserInfo', {});
            }
            _this2.fade();
        });
    },
    onCloseClick: function onCloseClick(target, data) {
        this.fade();
    }
}

// update (dt) {},
);

cc._RF.pop();