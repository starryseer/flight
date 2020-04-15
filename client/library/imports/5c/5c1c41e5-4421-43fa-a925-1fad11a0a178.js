"use strict";
cc._RF.push(module, '5c1c4HlRCFD+qklH60RoKF4', 'avatar');
// script/miniGame/miniMain/prefab/avatar.js

'use strict';

var _global = require('./../../../global/global');

var _global2 = _interopRequireDefault(_global);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

cc.Class({
    extends: cc.Component,

    properties: {
        avatar: {
            default: null,
            type: cc.Sprite,
            tooltip: '头像'
        },
        chosen: {
            default: null,
            type: cc.Node,
            tooltip: '被选中'
        },
        tag: {
            default: -1,
            type: cc.Integer,
            tooltip: '标签'
        }

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this.node.on('init', this.init, this);
        cc.systemEvent.on('avatarChosen', this.avatarChosen, this);
    },
    onDestroy: function onDestroy() {
        cc.systemEvent.off('avatarChosen', this.avatarChosen, this);
    },
    start: function start() {},
    init: function init(tag) {
        var _this = this;

        this.tag = tag;
        this.isChosen();
        var avatarUrl = _global2.default.imageConf.avatar[tag];
        cc.loader.load({ url: avatarUrl, type: 'png' }, function (error, purl) {
            var oldSize = _this.avatar.node.width;
            _this.avatar.spriteFrame = new cc.SpriteFrame(purl);
            var newSize = _this.avatar.node.width;
            _this.avatar.node.scale = oldSize / newSize / 2;
        });
    },
    isChosen: function isChosen() {
        if (this.tag == _global2.default.clientAttrData.avatar) {
            this.chosen.active = true;
        } else this.chosen.active = false;
    },
    onButtonClick: function onButtonClick(target, data) {
        cc.systemEvent.emit('avatarChosen', this.tag);
    },
    avatarChosen: function avatarChosen(data) {
        if (data == this.tag) {
            this.chosen.active = true;
        } else this.chosen.active = false;
    }

    // update (dt) {},

});

cc._RF.pop();