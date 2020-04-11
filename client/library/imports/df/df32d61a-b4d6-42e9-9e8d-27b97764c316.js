"use strict";
cc._RF.push(module, 'df32dYatNZC6Z6NJ7l3ZMMW', 'player');
// script/home/player/player.js

"use strict";

var _JoystickEnum = require("./../../helper/Joystick/JoystickEnum");

var _JoystickEnum2 = _interopRequireDefault(_JoystickEnum);

var _JoystickEvent = require("./../../helper/Joystick/JoystickEvent");

var _JoystickEvent2 = _interopRequireDefault(_JoystickEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

cc.Class({
    extends: cc.Component,
    properties: {

        // from joystick
        moveDir: {
            default: cc.v2(0, 1),
            displayName: 'Move Dir',
            tooltip: '移动方向'
        },
        _speedType: {
            default: _JoystickEnum2.default.SpeedType.STOP,
            displayName: 'Speed Type',
            type: _JoystickEnum2.default.SpeedType,
            tooltip: '速度级别'
        },

        // from self
        _moveSpeed: {
            default: 0,
            displayName: 'Move Speed',
            tooltip: '移动速度'
        },

        stopSpeed: {
            default: 0,
            type: cc.Integer,
            tooltip: '停止时速度'
        },
        normalSpeed: {
            default: 100,
            type: cc.Integer,
            tooltip: '正常速度'
        },
        fastSpeed: {
            default: 200,
            type: cc.Integer,
            tooltip: '最快速度'
        }
    },

    onLoad: function onLoad() {
        _JoystickEvent2.default.getInstance().on(_JoystickEnum2.default.JoystickEventType.TOUCH_START, this.onTouchStart, this);
        _JoystickEvent2.default.getInstance().on(_JoystickEnum2.default.JoystickEventType.TOUCH_MOVE, this.onTouchMove, this);
        _JoystickEvent2.default.getInstance().on(_JoystickEnum2.default.JoystickEventType.TOUCH_END, this.onTouchEnd, this);
    },
    onTouchStart: function onTouchStart() {},
    onTouchMove: function onTouchMove(event, data) {
        this._speedType = data.speedType;
        this.moveDir = data.moveDistance;
    },
    onTouchEnd: function onTouchEnd(event, data) {
        this._speedType = data.speedType;
    },


    // methods
    move: function move() {
        //       this.node.angle = cc.misc.radiansToDegrees(
        //           Math.atan2(this.moveDir.y, this.moveDir.x)
        //       ) - 90;
        // cc.log(this.moveDir.mul(this._moveSpeed / 120));
        var delat = this.moveDir.mul(this._moveSpeed / 120);
        this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(delat.x * 120, delat.y * 120);

        //       let newPos = this.node.position.add(this.moveDir.mul(this._moveSpeed / 120));
        //       this.node.setPosition(newPos);
    },
    update: function update(dt) {
        switch (this._speedType) {
            case _JoystickEnum2.default.SpeedType.STOP:
                this._moveSpeed = this.stopSpeed;
                break;
            case _JoystickEnum2.default.SpeedType.NORMAL:
                this._moveSpeed = this.normalSpeed;
                break;
            case _JoystickEnum2.default.SpeedType.FAST:
                this._moveSpeed = this.fastSpeed;
                break;
            default:
                break;
        }
        this.move();
    }
});

cc._RF.pop();