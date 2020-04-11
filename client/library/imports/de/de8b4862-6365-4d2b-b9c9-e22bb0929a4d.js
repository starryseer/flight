"use strict";
cc._RF.push(module, 'de8b4hiY2VNK7nJ4iuwkppN', 'ball');
// script/miniGame/jumpBall/ball.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {},

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this.initSpeed = 0;
    },


    onBeginContact: function onBeginContact(contact, selfCollider, otherCollider) {
        var rigidBody = selfCollider.node.getComponent(cc.RigidBody);
        if (!this.initSpeed) {

            this.initSpeed = rigidBody.linearVelocity.y;
        } else {
            rigidBody.linearVelocity = cc.v2(0, this.initSpeed);
        }
        cc.systemEvent.emit('collider', {});
    }

    // update (dt) {},
});

cc._RF.pop();