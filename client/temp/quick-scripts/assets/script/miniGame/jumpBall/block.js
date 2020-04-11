(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/miniGame/jumpBall/block.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'ffd21IWedNHDJhVf25w/m9C', 'block', __filename);
// script/miniGame/jumpBall/block.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {},

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        var _this = this;

        this.node.on('init', function (data) {
            var width = Math.random() * 100 + 250;
            _this.node.width = width;
            _this.node.getComponent(cc.PhysicsBoxCollider).width = width;
        });
    }
}

// update (dt) {},
);

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
        //# sourceMappingURL=block.js.map
        