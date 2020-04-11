(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/miniGame/miniMain/title.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '7dd05Wz+xpGQZZE8FF5uD6H', 'title', __filename);
// script/miniGame/miniMain/title.js

'use strict';

var _global = require('./../../global/global');

var _global2 = _interopRequireDefault(_global);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

cc.Class({
    extends: cc.Component,

    properties: {
        goldLab: {
            default: null,
            type: cc.Label,
            tooltip: '金币标签'
        },
        moodLab: {
            default: null,
            type: cc.Label,
            tooltip: '心情标签'
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        var _this = this;

        this.node.on('init', function (data) {
            _this.goldLab.string = _global2.default.clientAttrData.gold;
            _this.moodLab.string = Math.floor((_global2.default.clientAttrData.mood + 200) / 400 * 100) + "%";
        });
    },
    onBackClick: function onBackClick(target, data) {
        cc.director.loadScene('home');
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
        //# sourceMappingURL=title.js.map
        