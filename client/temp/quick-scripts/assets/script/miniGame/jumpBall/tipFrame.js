(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/miniGame/jumpBall/tipFrame.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '048dedikMhOVbBZfpVb73f1', 'tipFrame', __filename);
// script/miniGame/jumpBall/tipFrame.js

'use strict';

var _global = require('./../../global/global');

var _global2 = _interopRequireDefault(_global);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

cc.Class({
    extends: cc.Component,

    properties: {
        nowLab: {
            default: null,
            type: cc.Label,
            tooltip: '本次得分'
        },
        maxLab: {
            default: null,
            type: cc.Label,
            tooltip: '最高得分'
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        var _this = this;

        this.node.on('show', function (data) {
            _this.node.setPosition(cc.v2(0, 0));
            _this.nowLab.string = data.now;
            _this.maxLab.string = data.max;
        });
        this.node.on('fade', function (data) {
            _this.node.setPosition(cc.v2(2000, 0));
        });
    },
    onButtonClick: function onButtonClick(target, data) {
        if (data == 1) cc.director.loadScene('jumpBall');else cc.director.loadScene('miniMain');
    },
    onDestroy: function onDestroy() {}
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
        //# sourceMappingURL=tipFrame.js.map
        