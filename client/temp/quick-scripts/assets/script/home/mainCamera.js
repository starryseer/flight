(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/home/mainCamera.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'cf2ebNL5cdDoL68A0PFxS8x', 'mainCamera', __filename);
// script/home/mainCamera.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        player: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    update: function update(dt) {
        this.node.x = this.player.x;
    }
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
        //# sourceMappingURL=mainCamera.js.map
        