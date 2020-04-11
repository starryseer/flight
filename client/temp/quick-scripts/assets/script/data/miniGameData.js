(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/data/miniGameData.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'ab35bDdOzFBuIefTvTyiDwZ', 'miniGameData', __filename);
// script/data/miniGameData.js

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var miniGameData = function miniGameData() {
    var that = {};
    that.miniGame = {};

    that.initMiniGameData = function (miniGames) {
        for (var index in miniGames) {
            that.miniGame[miniGames[index]['gameId']] = miniGames[index];
        }
    };

    that.playData = function (miniGame) {
        that.miniGame[miniGame['gameId']] = miniGame;
    };

    return that;
};
exports.default = miniGameData;
module.exports = exports['default'];

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
        //# sourceMappingURL=miniGameData.js.map
        