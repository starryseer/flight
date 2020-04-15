cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on('init',(data)=>{
            var width = Math.random()*100 + 250;
            this.node.width = width;
            this.node.getComponent(cc.PhysicsBoxCollider).width = width;
        });
    },

    // update (dt) {},
});
