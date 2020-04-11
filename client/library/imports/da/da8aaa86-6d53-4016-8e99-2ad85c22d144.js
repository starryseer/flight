"use strict";
cc._RF.push(module, 'da8aaqGbVNAFo6ZKthcItFE', 'startTarggit');
// script/home/trigger/startTarggit.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        loadScene: {
            default: null,
            displayName: 'LoadScene',
            tooltip: '跳转场景'
        }
    },

    onLoad: function onLoad() {
        var _this = this;

        this.node.on('updateScene', function (scene) {
            _this.loadScene = scene;
        });
    },
    onButtonClick: function onButtonClick(target, data) {
        if (this.loadScene == null) return;

        cc.director.loadScene(this.loadScene);
    }
});

cc._RF.pop();