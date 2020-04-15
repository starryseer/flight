import global from "../global/global";

cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

        this.initCollision();
        this.initPhysics();
    },

    initCollision(){
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
    },

    initPhysics(){
        var manager = cc.director.getPhysicsManager();
        manager.enabled = true;
        manager.gravity = cc.v2(0,0);
        // manager.enabledDebugDraw = true;
    },
    

    // update (dt) {},
});
