cc.Class({
    extends: cc.Component,

    properties: {
       
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.initSpeed = 0;
    },

    onBeginContact: function (contact, selfCollider, otherCollider) 
    {
        var rigidBody = selfCollider.node.getComponent(cc.RigidBody);
        if(!this.initSpeed)
        {

            this.initSpeed = rigidBody.linearVelocity.y;
        }
        else
        {
            rigidBody.linearVelocity = cc.v2(0,this.initSpeed);

        }
        cc.systemEvent.emit('collider',{});
    },

    // update (dt) {},
});
