"use strict";
cc._RF.push(module, '7dd05Wz+xpGQZZE8FF5uD6H', 'title');
// script/miniGame/miniMain/title.js

'use strict';

var _global = require('./../../global/global');

var _global2 = _interopRequireDefault(_global);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

cc.Class({
    extends: cc.Component,

    properties: {
        goldLab: {
            default: null,
            type: cc.Label,
            tooltip: '金币标签'
        },
        moodLab: {
            default: null,
            type: cc.Label,
            tooltip: '心情标签'
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this.init();
        this.node.on('update', this.init, this);
    },
    init: function init() {
        this.goldLab.string = _global2.default.clientAttrData.gold;
        this.moodLab.string = Math.floor((_global2.default.clientAttrData.mood + 200) / 400 * 100) + "%";
    },
    onBackClick: function onBackClick(target, data) {
        cc.director.loadScene('home');
    }
}

// update (dt) {},
);

cc._RF.pop();