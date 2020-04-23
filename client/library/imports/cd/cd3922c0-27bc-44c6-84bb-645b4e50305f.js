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
        matterLab: {
            default: null,
            type: cc.Label,
            tooltip: '头部'
        },
        arrow: {
            default: null,
            type: cc.Node,
            tooltip: '选择箭头'
        },
        unArrow: {
            default: null,
            type: cc.Node,
            tooltip: '未选箭头'
        },
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
        this.node.on('init', this.init, this);
        this.node.on('btnTouch', this.btnTouch, this);
        this.node.on('fade', this.fade, this);
        cc.systemEvent.on('minusBagLab', this.minusBagLab, this);
        cc.systemEvent.on('updateItems', this.updateItems, this);
    },
    start: function start() {},
    onDestroy: function onDestroy() {
        cc.systemEvent.off('minusBagLab', this.minusBagLab, this);
        cc.systemEvent.off('updateItems', this.updateItems, this);
    },
    btnTouch: function btnTouch() {
        if (!this.flag) {
            this.show();
        } else {
            this.fade();
        }
    },
    init: function init() {
        this.show();
        this.content.removeAllChildren();
        var num = 0;
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
                num++;
            }
        }
        this.matterLab.string = num;
        this.fade();
    },
    show: function show() {
        this.flag = true;
        this.head.active = true;
        this.node.active = this.flag;
        this.arrow.active = true;
        this.unArrow.active = false;
    },
    fade: function fade() {
        this.flag = false;
        this.head.active = false;
        this.node.active = this.flag;
        this.arrow.active = false;
        this.unArrow.active = true;
    },
    minusBagLab: function minusBagLab(data) {
        if (data['type'] == this.node.name) this.matterLab.string = parseInt(this.matterLab.string) - 1;
    },
    updateItems: function updateItems(data) {
        if (_global2.default.configConf['item'][data['item_id']]['showType'] == 'matter') {
            var children = this.content.getChildren();
            for (var index in children) {
                children[index].emit('updateItem', data);
            }
        }
    }
}

// update (dt) {},
);

cc._RF.pop();