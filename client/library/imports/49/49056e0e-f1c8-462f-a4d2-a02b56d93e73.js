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
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        var _this = this;

        //this.init();
        var avatarUrl = _global2.default.imageConf.avatar[_global2.default.clientAttrData.avatar];
        cc.loader.load({ url: avatarUrl, type: 'png' }, function (error, purl) {
            var oldSize = _this.avatar.node.width;
            _this.avatar.spriteFrame = new cc.SpriteFrame(purl);
            var newSize = _this.avatar.node.width;
            _this.avatar.node.scale = oldSize / newSize / 2;
        });
        this.node.on('update', this.update, this);
        cc.systemEvent.on('updateUserInfo', this.init, this);
    },
    onDestroy: function onDestroy() {
        cc.systemEvent.off('updateUserInfo', this.init, this);
    },
    update: function update() {
        this.nicknameLab.string = _global2.default.clientAttrData.nickname ? _global2.default.clientAttrData.nickname : "";
        this.signatureLab.string = _global2.default.clientAttrData.signature ? _global2.default.clientAttrData.signature : "";
    },
    init: function init() {
        this.nicknameLab.string = _global2.default.clientAttrData.nickname ? _global2.default.clientAttrData.nickname : "";
        this.signatureLab.string = _global2.default.clientAttrData.signature ? _global2.default.clientAttrData.signature : "";
    },
    onModifyClick: function onModifyClick(target, data) {
        this.editFrame.emit('show', {});
    }
}

// update (dt) {},
);

cc._RF.pop();