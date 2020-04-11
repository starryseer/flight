"use strict";
cc._RF.push(module, 'ab35bDdOzFBuIefTvTyiDwZ', 'miniGameData');
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