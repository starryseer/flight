(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/miniGame/miniMain/rankList.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '7ff53wfQ/RL1bQdrXiKoujP', 'rankList', __filename);
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
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=rankList.js.map
        