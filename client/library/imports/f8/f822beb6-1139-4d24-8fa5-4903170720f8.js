"use strict";
cc._RF.push(module, 'f822b62ETlNJI+lSQMXByD4', 'rankInfo');
// script/miniGame/miniMain/prefab/rankInfo.js

'use strict';

var _global = require('./../../../global/global');

var _global2 = _interopRequireDefault(_global);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

cc.Class({
    extends: cc.Component,

    properties: {
        rankLab: {
            default: null,
            type: cc.Label,
            tooltip: '排名'
        },
        pointLab: {
            default: null,
            type: cc.Label,
            tooltip: '分数'
        },
        nicknameLab: {
            default: null,
            type: cc.Label,
            tooltip: '昵称'
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
        this.node.on('init', this.init, this);
    },
    init: function init(data) {
        this.loadAvatar();
        this.rankLab.string = data.rank;
        this.pointLab.string = data.point;
        this.nicknameLab.string = data.nickname;
    },
    loadAvatar: function loadAvatar() {
        var oldSize = this.avatar.node.width;
        this.avatar.spriteFrame = this.headAtlas.getSpriteFrame(_global2.default.imageConf.avatar[_global2.default.clientAttrData.avatar]);
        var newSize = this.avatar.node.width;
        this.avatar.node.scale = oldSize / newSize / 2;
    }
}

// update (dt) {},
);

cc._RF.pop();