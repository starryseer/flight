(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/helper/Joystick/JoystickEvent.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'c6997vNX3lIT6tRYBdLjc2u', 'JoystickEvent', __filename);
// script/Joystick/JoystickEvent.js

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var JoystickEvent = cc.Class({

    properties: {
        _event: null
    },

    ctor: function ctor() {
        this._event = new cc.EventTarget();
    },
    on: function on(eventType, callFunc, target) {
        this._event.on(eventType, callFunc, target);
    },
    off: function off(eventType, callFunc, target) {
        this._event.off(eventType, callFunc, target);
    },


    /**
     *
     * @param eventType JoystickEnum.JoystickEventType
     * @param arg
     */
    emit: function emit(eventType) {
        var _event;

        for (var _len = arguments.length, arg = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            arg[_key - 1] = arguments[_key];
        }

        (_event = this._event).emit.apply(_event, [eventType].concat(_toConsumableArray(arg)));
    }
});

var _instance = null;
JoystickEvent.getInstance = function () {
    !_instance && (_instance = new JoystickEvent());

    return _instance;
};

exports.default = JoystickEvent;
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
        //# sourceMappingURL=JoystickEvent.js.map
        