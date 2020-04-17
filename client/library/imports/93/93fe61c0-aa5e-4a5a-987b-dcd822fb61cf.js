"use strict";
cc._RF.push(module, '93fe6HAql5KWph73Ngi+2HP', 'infoBg');
// script/home/player/infoBg.js

'use strict';

var _global = require('./../../global/global');

var _global2 = _interopRequireDefault(_global);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

cc.Class({
    extends: cc.Component,

    properties: {
        bag: {
            default: null,
            type: cc.Node,
            tooltip: '背包'
        },
        mood: {
            default: null,
            type: cc.Node,
            tooltip: '心情'
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this.node.active = false;
        this.node.on('init', this.init, this);
        _global2.default.FitHelper.onEnable(this.node);
        this.node.on(cc.Node.EventType.TOUCH_START, this.fade, this);
    },
    start: function start() {},
    init: function init() {},
    fade: function fade() {
        this.node.active = false;
    }

    // update (dt) {},

});

cc._RF.pop();