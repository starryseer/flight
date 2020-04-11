"use strict";
cc._RF.push(module, '490564O8chGL6TSoCtW2T5z', 'userInfo');
// script/miniGame/miniMain/userInfo.js

'use strict';

var _global = require('./../../global/global');

var _global2 = _interopRequireDefault(_global);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

cc.Class({
    extends: cc.Component,

    properties: {
        nicknameLab: {
            default: null,
            type: cc.Label,
            tooltip: '昵称标签'
        },
        signatureLab: {
            default: null,
            type: cc.Label,
            tooltip: '签名标签'
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        var _this = this;

        this.node.on('init', function (data) {
            _this.nicknameLab.string = _global2.default.clientAttrData.nickname ? _global2.default.clientAttrData.nickname : "";
            _this.signatureLab.string = _global2.default.clientAttrData.signature ? _global2.default.clientAttrData.signature : "";
        });
    },
    onModifyClick: function onModifyClick(target, data) {}
}

// update (dt) {},
);

cc._RF.pop();