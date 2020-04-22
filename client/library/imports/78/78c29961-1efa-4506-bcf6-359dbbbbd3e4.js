"use strict";
cc._RF.push(module, '78c29lhHvpFBrz2NZ27u9Pk', 'homeItem');
// script/home/prefab/homeItem.js

'use strict';

var _global = require('./../../global/global');

var _global2 = _interopRequireDefault(_global);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

cc.Class({
    extends: cc.Component,

    properties: {
        itemAtlas: {
            default: null,
            type: cc.SpriteAtlas,
            tooltip: '道具plist'
        },
        itemSprite: {
            default: null,
            type: cc.Sprite,
            tooltip: '道具图片'
        },
        itemLab: {
            default: null,
            type: cc.Label,
            tooltip: '道具数量'
        },
        itemId: {
            default: 0,
            type: cc.Integer,
            tooltip: '道具id'
        },
        id: {
            default: 0,
            type: cc.Integer,
            tooltip: 'id'
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this.node.on('init', this.init, this);
    },
    start: function start() {},
    init: function init(data) {
        this.itemSprite.spriteFrame = this.itemAtlas.getSpriteFrame(_global2.default.configConf['item'][data['item_id']]['image']);
        this.itemLab.string = '✖' + data['num'];
        this.itemId = data['item_id'];
        this.id = parseInt(data['id']);
    },
    onButtonClick: function onButtonClick() {
        cc.log(this.node.getPosition());
        var data = {
            'item_id': this.itemId,
            'pos': this.node.convertToWorldSpaceAR(cc.v2(-320, -475)),
            'num': parseInt(this.itemLab.string.substr(1)),
            'id': this.id
        };
        cc.systemEvent.emit('showInfo', data);
    }
}

// update (dt) {},
);

cc._RF.pop();