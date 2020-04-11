(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/miniGame/miniMain/smallFrame.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'cebefVqpMVHP7zvCMaxyuiJ', 'smallFrame', __filename);
// script/miniGame/miniMain/smallFrame.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {},

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start: function start() {},
    onFrameClick: function onFrameClick(target, data) {
        cc.director.loadScene('jumpBall');
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
        //# sourceMappingURL=smallFrame.js.map
        