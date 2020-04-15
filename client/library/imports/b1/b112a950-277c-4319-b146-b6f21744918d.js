"use strict";
cc._RF.push(module, 'b112alQJ3xDGbFGtvIXRJGN', 'miniInitCache');
// script/cache/miniInitCache.js

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var miniInitCache = function miniInitCache() {
    var that = {};
    that.nickname = null;

    that.setNickname = function (nickname) {
        that.nickname = nickname;
    };

    that.getNickname = function () {
        return that.nickname;
    };

    return that;
};
exports.default = miniInitCache;
module.exports = exports["default"];

cc._RF.pop();