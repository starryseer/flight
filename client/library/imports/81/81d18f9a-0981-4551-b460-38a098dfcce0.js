"use strict";
cc._RF.push(module, '81d18+aCYFFUbRgOKCY38zg', 'miniInit');
// script/miniGame/miniInit/miniInit.js

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
        nickname: {
            default: null,
            type: cc.Node,
            tooltip: '昵称界面'
        },
        refirm: {
            default: null,
            type: cc.Node,
            tooltip: '确认界面'
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        _global2.default.FitHelper.fitFun(this.bg);
        this.nickname.active = true;
        this.refirm.active = false;
        cc.systemEvent.on('miniInit', this.sceneChange, this);
    },
    onDestroy: function onDestroy() {
        cc.systemEvent.off('miniInit', this.sceneChange, this);
    },
    sceneChange: function sceneChange(data) {
        if (data == 1) {
            this.nickname.active = false;
            this.refirm.active = true;
        } else if (data == 0) {
            this.nickname.active = true;
            this.refirm.active = false;
        }
    },
    onBackClick: function onBackClick(target, data) {
        cc.director.loadScene('home');
    }

    // update (dt) {},

});

cc._RF.pop();