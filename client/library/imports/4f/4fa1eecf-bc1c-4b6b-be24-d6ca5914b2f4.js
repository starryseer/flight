"use strict";
cc._RF.push(module, '4fa1e7PvBxLa74k1spZFLL0', 'userData');
// script/data/userData.js

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var userData = function userData() {
    var that = {};
    that.id = null;
    that.token = null;

    that.initUserData = function (user) {
        that.id = user.id;
        that.token = user.token;
    };

    return that;
};
exports.default = userData;
module.exports = exports["default"];

cc._RF.pop();