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
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {},
    start: function start() {
        _global2.default.FitHelper.onEnable(this.infoBg);
        this.infoBg.active = false;
        this.infoBg.on(cc.Node.EventType.TOUCH_START, this.fade, this);
    },
    onPlayerClick: function onPlayerClick(target, data) {
        this.infoBg.active = true;
        this.infoBg.emit('init', {});
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