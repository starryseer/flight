"use strict";
cc._RF.push(module, '7afabbTGNxBhaBaC//olAbc', 'item');
// script/shop/prefab/item.js

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
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this.node.on('init', this.init, this);
    },
    start: function start() {},
    init: function init(data) {
        this.itemSprite.spriteFrame = this.itemAtlas.getSpriteFrame(_global2.default.configConf['item'][data]['image']);
    }
}

// update (dt) {},
);

cc._RF.pop();