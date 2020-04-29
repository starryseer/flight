"use strict";
cc._RF.push(module, '221feVzertNG73nAvvI8wSo', 'useConfirmFrame');
// script/home/prefab/useConfirmFrame.js

'use strict';

var _global = require('./../../global/global');

var _global2 = _interopRequireDefault(_global);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

cc.Class({
    extends: cc.Component,

    properties: {
        gainLab: {
            default: null,
            type: cc.Label,
            tooltip: '标签'
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this.node.on('init', this.init, this);
    },
    start: function start() {},
    init: function init(data) {
        this.gainLab.string = '';
        var string = '';
        for (var key in data['show']) {
            var keyNow = key + "";
            switch (keyNow) {
                case '0':
                    string = "疲劳 ✖" + data['show'][key]['num'] + "\n";
                    break;
                case '1':
                    string = "金币 ✖" + data['show'][key]['num'] + "\n";
                    break;
                case '2':
                    string = "钻石 ✖" + data['show'][key]['num'] + "\n";
                    break;
                default:
                    string = _global2.default.configConf['item'][keyNow]['name'] + "✖" + data['show'][key]['num'] + "\n";
            }
            this.gainLab.string += string;
        }
    },
    onButtonClick: function onButtonClick(target, data) {
        this.node.destroy();
    }
}

// update (dt) {},
);

cc._RF.pop();