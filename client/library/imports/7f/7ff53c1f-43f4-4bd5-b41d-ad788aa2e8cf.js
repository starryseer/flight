"use strict";
cc._RF.push(module, '7ff53wfQ/RL1bQdrXiKoujP', 'rankList');
// script/miniGame/miniMain/rankList.js

'use strict';

var _global = require('./../../global/global');

var _global2 = _interopRequireDefault(_global);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

cc.Class({
    extends: cc.Component,

    properties: {
        pointLab: {
            default: null,
            type: cc.Label,
            tooltip: '分数标签'
        },
        gameId: {
            default: 1,
            displayName: 'gameId',
            tooltip: '当前游戏ID'
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        var _this = this;

        this.node.on('init', function () {
            _this.pointLab.string = _global2.default.miniGameData.miniGame[_this.gameId]['point'];
        });
    },
    onRankClick: function onRankClick(target, data) {}
}

// update (dt) {},
);

cc._RF.pop();