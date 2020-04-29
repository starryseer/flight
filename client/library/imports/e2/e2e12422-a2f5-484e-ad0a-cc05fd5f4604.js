"use strict";
cc._RF.push(module, 'e2e12QiovVITq0KzAX9X0YE', 'playerClick');
// script/home/player/playerClick.js

'use strict';

var _global = require('./../../global/global');

var _global2 = _interopRequireDefault(_global);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

cc.Class({
    extends: cc.Component,

    properties: {
        infoBg: {
            default: null,
            type: cc.Node,
            tooltip: '个人信息'
        },
        currentTime: {
            default: 0,
            type: cc.Integer,
            tooltip: '当前事件'
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    },
    start: function start() {
        _global2.default.FitHelper.onEnable(this.infoBg);
        this.infoBg.active = false;
        this.infoBg.on(cc.Node.EventType.TOUCH_START, this.fade, this);
        if (this.node._touchListener) {
            this.node._touchListener.setSwallowTouches(false);
        }
    },
    onTouchStart: function onTouchStart() {
        this.currentTime = Date.now();
        //通过系统事件触发自定义锁，防止点击角色移动
        cc.systemEvent.emit('playerLock', {});
        this.scheduleOnce(function () {
            cc.systemEvent.emit('playerUnLock', {});
        }, 0.2);
    },
    onTouchEnd: function onTouchEnd() {
        if (Date.now() - this.currentTime < 200) {
            this.infoBg.active = true;
            this.infoBg.emit('init', {});
        }
    },
    fade: function fade() {
        this.infoBg.active = false;
    },
    onBagClick: function onBagClick(target, data) {
        cc.systemEvent.emit('bagShow', {});
        this.infoBg.active = false;
    }
}

// update (dt) {},
);

cc._RF.pop();