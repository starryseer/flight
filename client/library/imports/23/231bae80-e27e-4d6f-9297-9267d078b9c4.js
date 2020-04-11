"use strict";
cc._RF.push(module, '231ba6A4n5Nb5KXkmfQeLnE', 'trigger');
// script/home/trigger/trigger.js

'use strict';

var _global = require('./../../global/global');

var _global2 = _interopRequireDefault(_global);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

cc.Class({
    extends: cc.Component,

    properties: {
        triggerFrame: {
            default: null,
            type: cc.Node,
            tooltip: '角色想象框'
        },
        startTarggit: {
            default: null,
            type: cc.Node,
            tooltip: '触发操作小手'
        },
        framePrefab: {
            default: [],
            type: cc.Prefab,
            tooltip: '角色想象图标'
        },
        triggerOther: {
            default: [],
            type: cc.Node,
            tooltip: '触发其他场景'
        },
        frameAcitve: {
            default: false,
            displayName: 'frameAcitve',
            tooltip: '框是否激活'
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        // 隐藏节点
        this.triggerFrame.active = false;
        this.startTarggit.active = false;
        this.anim_com = this.startTarggit.getComponent(cc.Animation);
    },


    onCollisionEnter: function onCollisionEnter(other, self) {
        this.showFrame(other.tag);
        this.trigOther(other.tag, true);
        this.updateScene(other.tag);
    },

    onCollisionExit: function onCollisionExit(other, self) {
        this.startTarggit.active = false;
        this.hideFrame();
        this.trigOther(other.tag, false);
        this.updateScene(null);
    },

    showFrame: function showFrame(tag) {
        var _this = this;

        var triggerConf = _global2.default.triggerConf[tag];
        this.triggerFrame.removeAllChildren();
        var triggerPrefab = cc.instantiate(this.framePrefab[triggerConf['frame']]);
        triggerPrefab.parent = this.triggerFrame;
        this.frameAcitve = true;
        this.node.runAction(cc.sequence(cc.delayTime(0.2), cc.callFunc(function () {
            _this.triggerFrame.active = _this.frameAcitve;
            _this.startTarggit.active = _this.frameAcitve;
        })));
    },
    hideFrame: function hideFrame() {
        this.frameAcitve = false;
        this.triggerFrame.removeAllChildren();
        this.triggerFrame.active = this.frameAcitve;
        this.startTarggit.active = this.frameAcitve;
    },
    trigOther: function trigOther(tag, flag) {
        var triggerConf = _global2.default.triggerConf[tag];
        if (triggerConf['other'] == null) return;

        //触发监听trigger事件
        this.triggerOther[triggerConf['other']].emit('trigger', flag);
    },
    updateScene: function updateScene(tag) {
        if (tag == null) {
            this.startTarggit.emit("updateScene", null);
            return;
        }

        var triggerConf = _global2.default.triggerConf[tag];
        this.startTarggit.emit("updateScene", triggerConf['scene']);
    }

    // update (dt) {},

});

cc._RF.pop();