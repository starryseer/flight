"use strict";
cc._RF.push(module, '490564O8chGL6TSoCtW2T5z', 'userInfo');
// script/miniGame/miniMain/userInfo.js

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
            tooltip: '昵称标签'
        },
        signatureLab: {
            default: null,
            type: cc.Label,
            tooltip: '签名标签'
        },
        editFrame: {
            default: null,
            type: cc.Node,
            tooltip: '签名标签'
        },
        avatar: {
            default: null,
            type: cc.Sprite,
            tooltip: '头像'
        },
        headAtlas: {
            default: null,
            type: cc.SpriteAtlas,
            tooltip: '头像plist'
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this.init();
        this.node.on('update', this.init, this);
        cc.systemEvent.on('updateUserInfo', this.updateUserInfo, this);
    },
    onDestroy: function onDestroy() {
        cc.systemEvent.off('updateUserInfo', this.updateUserInfo, this);
    },
    init: function init() {
        this.nicknameLab.string = _global2.default.clientAttrData.nickname ? _global2.default.clientAttrData.nickname : "";
        this.signatureLab.string = _global2.default.clientAttrData.signature ? _global2.default.clientAttrData.signature : "";
        this.loadAvatar();
    },
    loadAvatar: function loadAvatar() {
        var oldSize = this.avatar.node.width;
        this.avatar.spriteFrame = this.headAtlas.getSpriteFrame(_global2.default.imageConf.avatar[_global2.default.clientAttrData.avatar]);
        var newSize = this.avatar.node.width;
        this.avatar.node.scale = oldSize / newSize / 2;
    },
    updateUserInfo: function updateUserInfo() {
        this.nicknameLab.string = _global2.default.clientAttrData.nickname ? _global2.default.clientAttrData.nickname : "";
        this.signatureLab.string = _global2.default.clientAttrData.signature ? _global2.default.clientAttrData.signature : "";
        this.loadAvatar();
    },
    onModifyClick: function onModifyClick(target, data) {
        this.editFrame.emit('show', {});
    }
}

// update (dt) {},
);

cc._RF.pop();