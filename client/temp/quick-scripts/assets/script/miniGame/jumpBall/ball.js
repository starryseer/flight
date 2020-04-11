(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/miniGame/jumpBall/ball.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'de8b4hiY2VNK7nJ4iuwkppN', 'ball', __filename);
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
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=ball.js.map
        