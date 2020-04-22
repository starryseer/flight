"use strict";
cc._RF.push(module, 'a615abMdGtGVIslVZApJ1/U', 'home');
// script/home/home.js

'use strict';

var _global = require('../global/global');

var _global2 = _interopRequireDefault(_global);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

cc.Class({
    extends: cc.Component,

    properties: {
        player: {
            default: null,
            type: cc.Node,
            tooltip: '人物'
        },
        ratio: {
            default: 0,
            type: cc.Float,
            tooltip: '人物'
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this.initCollision();
        this.initPhysics();
        this.ratio = _global2.default.FitHelper.fitFun(this.node);
    },
    start: function start() {
        this.player.scale = this.ratio;
    },
    initCollision: function initCollision() {
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
    },
    initPhysics: function initPhysics() {
        var manager = cc.director.getPhysicsManager();
        manager.enabled = true;
        manager.gravity = cc.v2(0, 0);
        manager.enabledDebugDraw = true;
    }
}

// update (dt) {},
);

cc._RF.pop();