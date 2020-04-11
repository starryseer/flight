(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/helper/Joystick/JoystickEnum.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '9a80bb6+3xG9Y1jWETkZEao', 'JoystickEnum', __filename);
// script/Joystick/JoystickEnum.js

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    JoystickType: cc.Enum({
        FIXED: 0,
        FOLLOW: 1
    }),

    DirectionType: cc.Enum({
        FOUR: 4,
        EIGHT: 8,
        ALL: 0
    }),

    SpeedType: cc.Enum({
        STOP: 0,
        NORMAL: 1,
        FAST: 2
    }),

    JoystickEventType: cc.Enum({
        TOUCH_START: "touchStart",
        TOUCH_MOVE: "touchMove",
        TOUCH_END: "touchEnd",

        CHANGE_JOYSTICK_TYPE: "changeJoystickType"
    })
};
module.exports = exports["default"];

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
        //# sourceMappingURL=JoystickEnum.js.map
        