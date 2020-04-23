"use strict";
cc._RF.push(module, '146e6o9rtVONaHCzpK8EEcT', 'saleFrame');
// script/home/prefab/saleFrame.js

'use strict';

var _global = require('./../../global/global');

var _global2 = _interopRequireDefault(_global);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

cc.Class({
    extends: cc.Component,

    properties: {
        bg: {
            default: null,
            type: cc.Node,
            tooltip: '背景'
        },
        slide: {
            default: null,
            type: cc.Slider,
            tooltip: '滑动条'
        },
        itemSprite: {
            default: null,
            type: cc.Sprite,
            tooltip: '图标'
        },
        itemAtlas: {
            default: null,
            type: cc.SpriteAtlas,
            tooltip: '道具plist'
        },
        nameLab: {
            default: null,
            type: cc.Label,
            tooltip: '名字'
        },
        numLab: {
            default: null,
            type: cc.Label,
            tooltip: '数量'
        },
        gainLab: {
            default: null,
            type: cc.Label,
            tooltip: '收益'
        },
        id: {
            default: 0,
            type: cc.Integer,
            tooltip: 'id'
        },
        maxNum: {
            default: 0,
            type: cc.Integer,
            tooltip: '最大数量'
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        _global2.default.FitHelper.onEnable(this.bg);
        this.node.on('init', this.init, this);
    },
    start: function start() {
        if (this.slide == null) {
            return;
        }

        this.slide.node.on('slide', this.onSlide, this);
    },
    init: function init(data) {
        var data = _global2.default.itemData.items[data['id']];
        var config = _global2.default.configConf['item'][data['item_id']];
        this.maxNum = data['num'];
        this.id = data['id'];
        this.numLab.string = this.maxNum;
        this.nameLab.string = config['name'];
        var oldSize = this.itemSprite.node.width;
        this.itemSprite.spriteFrame = this.itemAtlas.getSpriteFrame(config['image']);
        var newSize = this.itemSprite.node.width;
        this.itemSprite.node.scale = oldSize / newSize;
        this.updateGain(parseInt(this.numLab.string));
    },
    onSlide: function onSlide(event) {
        var num = Math.round(this.slide.progress * this.maxNum);
        this.numLab.string = num;
        this.slide.progress = num / this.maxNum;
        this.updateGain(num);
    },
    onPlusClick: function onPlusClick(target, data) {
        this.numLab.string = parseInt(this.numLab.string) < this.maxNum ? parseInt(this.numLab.string) + 1 : this.maxNum;
        this.slide.progress = parseInt(this.numLab.string) / this.maxNum;
        this.updateGain(parseInt(this.numLab.string));
    },
    onMinusClick: function onMinusClick(target, data) {
        this.numLab.string = parseInt(this.numLab.string) > 0 ? parseInt(this.numLab.string) - 1 : 0;
        this.slide.progress = parseInt(this.numLab.string) / this.maxNum;
        this.updateGain(parseInt(this.numLab.string));
    },
    updateGain: function updateGain(num) {
        var data = _global2.default.itemData.items[this.id];
        var config = _global2.default.configConf['item'][data['item_id']];
        this.gainLab.string = '✖' + num * parseInt(config['sale']);
    },
    onSubmitClick: function onSubmitClick(target, data) {
        var _this = this;

        if (parseInt(this.numLab.string) == 0) return;

        var param = { 'id': this.id, 'num': parseInt(this.numLab.string), 'userId': _global2.default.userData.id, 'token': _global2.default.userData.token };
        _global2.default.HttpHelper.httpPost(_global2.default.urlConf.item_sale, param, function (rsp) {
            if (rsp == -1) {
                return;
            }

            if (rsp.code == 200) {
                _global2.default.clientAttrData.initClientAttrData(rsp.data.clientAttr);
                _global2.default.itemData.update([rsp.data.item]);
                cc.systemEvent.emit('updateItems', rsp.data.item);
                cc.systemEvent.emit('showConfirmFrame', rsp.data.gold);
                _this.node.destroy();
            } else {
                return;
            }
        });
    },
    onCloseClick: function onCloseClick(target, data) {
        this.node.destroy();
    }

    // update (dt) {},

});

cc._RF.pop();