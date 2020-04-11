"use strict";
cc._RF.push(module, 'c29ecPtHzBCJ6ogvT/2qBs4', 'Joystick');
// script/helper/Joystick/Joystick.js

'use strict';

var _JoystickEnum = require('./JoystickEnum');

var _JoystickEnum2 = _interopRequireDefault(_JoystickEnum);

var _JoystickEvent = require('./JoystickEvent');

var _JoystickEvent2 = _interopRequireDefault(_JoystickEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

cc.Class({
    extends: cc.Component,

    properties: {
        player: {
            default: null,
            type: cc.Node,
            displayName: 'player',
            tooltip: '玩家角色'
        },
        dot: {
            default: null,
            type: cc.Node,
            displayName: 'Dot',
            tooltip: '摇杆操纵点'
        },
        ring: {
            default: null,
            type: cc.Node,
            displayName: 'Ring',
            tooltip: '摇杆背景节点'
        },

        joystickType: {
            default: _JoystickEnum2.default.JoystickType.FIXED,
            type: _JoystickEnum2.default.JoystickType,
            displayName: 'Touch Type',
            tooltip: '触摸类型'
        },

        directionType: {
            default: _JoystickEnum2.default.DirectionType.ALL,
            type: _JoystickEnum2.default.DirectionType,
            displayName: 'Direction Type',
            tooltip: '方向类型'
        },

        _stickPos: {
            default: null,
            type: cc.Node,
            tooltip: '摇杆所在位置'
        },
        _touchLocation: {
            default: null,
            type: cc.Node,
            tooltip: '触摸位置'
        }
    },

    onLoad: function onLoad() {
        this._radius = this.ring.width / 2;
        this._initTouchEvent();
        // hide joystick when follow
        if (this.joystickType === _JoystickEnum2.default.JoystickType.FOLLOW) {
            this.node.opacity = 0;
        }
    },
    onEnable: function onEnable() {
        _JoystickEvent2.default.getInstance().on(_JoystickEnum2.default.JoystickEventType.CHANGE_JOYSTICK_TYPE, this._onChangeJoystickType, this);
    },
    onDisable: function onDisable() {
        _JoystickEvent2.default.getInstance().off(_JoystickEnum2.default.JoystickEventType.CHANGE_JOYSTICK_TYPE, this._onChangeJoystickType, this);
    },
    _onChangeJoystickType: function _onChangeJoystickType(type) {
        this.joystickType = type;
        this.node.opacity = type === _JoystickEnum2.default.JoystickType.FIXED ? 255 : 0;
    },
    _initTouchEvent: function _initTouchEvent() {
        // set the size of joystick node to control scale
        this.node.on(cc.Node.EventType.TOUCH_START, this._touchStartEvent, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this._touchMoveEvent, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this._touchEndEvent, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this._touchEndEvent, this);
    },
    _touchStartEvent: function _touchStartEvent(event) {
        _JoystickEvent2.default.getInstance().emit(_JoystickEnum2.default.JoystickEventType.TOUCH_START, "joystick touch start", 10);
        var touchPos = this.node.convertToNodeSpaceAR(event.getLocation());
        // console.log(this.node.convertToNodeSpaceAR(event.getLocation()));


        if (this.joystickType === _JoystickEnum2.default.JoystickType.FIXED) {
            this._stickPos = this.ring.getPosition();

            // 触摸点与圆圈中心的距离
            var distance = touchPos.sub(this.ring.getPosition()).mag();

            // 手指在圆圈内触摸,控杆跟随触摸点
            this._radius > distance && this.dot.setPosition(touchPos);
        } else if (this.joystickType === _JoystickEnum2.default.JoystickType.FOLLOW) {

            // 记录摇杆位置，给 touch move 使用
            this._stickPos = touchPos;
            this.node.opacity = 255;
            this._touchLocation = event.getLocation();

            // 更改摇杆的位置
            this.ring.setPosition(touchPos);
            this.dot.setPosition(touchPos);
        }
    },
    _touchMoveEvent: function _touchMoveEvent(event) {
        // 如果 touch start 位置和 touch move 相同，禁止移动
        if (this.joystickType === _JoystickEnum2.default.JoystickType.FOLLOW && this._touchLocation === event.getLocation()) {
            return false;
        }

        // 以圆圈为锚点获取触摸坐标
        var touchPos = this.ring.convertToNodeSpaceAR(event.getLocation());
        var distance = touchPos.mag();

        // 由于摇杆的 postion 是以父节点为锚点，所以定位要加上 touch start 时的位置
        var posX = this._stickPos.x + touchPos.x;
        var posY = this._stickPos.y + touchPos.y;

        // 归一化
        var p = cc.v2(posX, posY).sub(this.ring.getPosition()).normalize();

        var speedType = void 0;

        if (this._radius > distance) {
            this.dot.setPosition(cc.v2(posX, posY));

            speedType = _JoystickEnum2.default.SpeedType.NORMAL;
        } else {
            // 控杆永远保持在圈内，并在圈内跟随触摸更新角度
            var x = this._stickPos.x + p.x * this._radius;
            var y = this._stickPos.y + p.y * this._radius;
            this.dot.setPosition(cc.v2(x, y));

            speedType = _JoystickEnum2.default.SpeedType.FAST;
        }

        _JoystickEvent2.default.getInstance().emit(_JoystickEnum2.default.JoystickEventType.TOUCH_MOVE, event, { speedType: speedType, moveDistance: p });
    },
    _touchEndEvent: function _touchEndEvent(event) {
        this.dot.setPosition(this.ring.getPosition());
        if (this.joystickType === _JoystickEnum2.default.JoystickType.FOLLOW) {
            this.node.opacity = 0;
        }

        _JoystickEvent2.default.getInstance().emit(_JoystickEnum2.default.JoystickEventType.TOUCH_END, event, { speedType: _JoystickEnum2.default.SpeedType.STOP });
    },
    update: function update(dt) {}
});

cc._RF.pop();