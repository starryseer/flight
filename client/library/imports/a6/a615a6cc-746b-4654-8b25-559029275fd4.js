"use strict";
cc._RF.push(module, 'a615abMdGtGVIslVZApJ1/U', 'home');
// script/home/home.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {},

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this.initCollision();
        this.initPhysics();
    },
    initCollision: function initCollision() {
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
    },
    initPhysics: function initPhysics() {
        var manager = cc.director.getPhysicsManager();
        manager.enabled = true;
        manager.gravity = cc.v2(0, 0);
        // manager.enabledDebugDraw = true;
    }
}

// update (dt) {},
);

cc._RF.pop();