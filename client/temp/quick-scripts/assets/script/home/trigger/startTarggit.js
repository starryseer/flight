(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/home/trigger/startTarggit.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'da8aaqGbVNAFo6ZKthcItFE', 'startTarggit', __filename);
// script/home/trigger/startTarggit.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        loadScene: {
            default: null,
            displayName: 'LoadScene',
            tooltip: '跳转场景'
        }
    },

    onLoad: function onLoad() {
        var _this = this;

        this.node.on('updateScene', function (scene) {
            _this.loadScene = scene;
        });
    },
    onButtonClick: function onButtonClick(target, data) {
        if (this.loadScene == null) return;

        cc.director.loadScene(this.loadScene);
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
        //# sourceMappingURL=startTarggit.js.map
        