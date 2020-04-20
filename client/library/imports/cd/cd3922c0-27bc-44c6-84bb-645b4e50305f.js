"use strict";
cc._RF.push(module, 'cd392LAJ7xExoS7ZFtOUDBf', 'matter');
// script/home/bag/matter.js

'use strict';

var _global = require('./../../global/global');

var _global2 = _interopRequireDefault(_global);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

cc.Class({
    extends: cc.Component,

    properties: {
        head: {
            default: null,
            type: cc.Node,
            tooltip: '头部'
        },
        content: {
            default: null,
            type: cc.Node,
            tooltip: '内容'
        },
        itemPrefab: {
            default: null,
            type: cc.Prefab,
            tooltip: '道具预制体'
        },
        flag: {
            default: false,
            tooltip: '开关标识'
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this.node.on('btnTouch', this.btnTouch, this);
        this.node.on('fade', this.fade, this);
    },
    start: function start() {},
    btnTouch: function btnTouch() {
        if (!this.flag) {
            this.show();
        } else {
            this.fade();
        }
    },
    show: function show() {
        this.flag = true;
        this.head.active = true;
        this.node.active = this.flag;

        this.content.removeAllChildren();
        for (var index in _global2.default.itemData.items) {
            if (_global2.default.configConf['item'][_global2.default.itemData.items[index].item_id]['showType'] == 'matter') {
                var item = cc.instantiate(this.itemPrefab);
                item.parent = this.content;
                var param = {
                    num: _global2.default.itemData.items[index].num,
                    item_id: _global2.default.itemData.items[index].item_id,
                    id: _global2.default.itemData.items[index].id,
                    type: _global2.default.itemData.items[index].type
                };
                item.emit('init', param);
            }
        }
    },
    fade: function fade() {
        this.flag = false;
        this.head.active = false;
        this.content.removeAllChildren();
        this.node.active = this.flag;
    }
}

// update (dt) {},
);

cc._RF.pop();