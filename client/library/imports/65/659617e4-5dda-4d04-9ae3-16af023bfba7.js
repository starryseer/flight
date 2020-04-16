"use strict";
cc._RF.push(module, '65961fkXdpNBJrjFq8CO/un', 'itemData');
// script/data/itemData.js

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var itemData = function itemData() {
    var that = {};
    that.items = {};
    that.initItemData = function (items) {
        that.items = {};
        for (var index in items) {
            that.items[items[index]['id']] = items[index];
        }
    };

    that.update = function (items) {
        if (items.length != 0) {
            for (var index in items) {
                if (items[index]['num'] == 0) delete that.items[items[index]['id']];else that.items[items[index]['id']] = items[index];
            }
        }
    };

    return that;
};
exports.default = itemData;
module.exports = exports['default'];

cc._RF.pop();