import global from "../global/global";

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
        }, 
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.initCollision();
        this.initPhysics();
        this.ratio = global.FitHelper.fitFun(this.node);
    },

    start(){
        this.player.scale = this.ratio;
    },

    initCollision(){
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
    },

    initPhysics(){
        var manager = cc.director.getPhysicsManager();
        manager.enabled = true;
        manager.gravity = cc.v2(0,0);
        manager.enabledDebugDraw = true;
    },
    

    // update (dt) {},
});
