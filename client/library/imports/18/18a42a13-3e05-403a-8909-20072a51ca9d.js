"use strict";
cc._RF.push(module, '18a42oTPgVAOokJIAcqUcqd', 'jumpBall');
// script/miniGame/jumpBall/jumpBall.js

'use strict';

var _global = require('./../../global/global');

var _global2 = _interopRequireDefault(_global);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

cc.Class({
    extends: cc.Component,

    properties: {
        bg: {
            default: null,
            type: cc.Node,
            tooltip: '背景'
        },
        ball: {
            default: null,
            type: cc.Node,
            tooltip: '小球'
        },
        tipFrame: {
            default: null,
            type: cc.Node,
            tooltip: '提示框'
        },
        blockPrefab: {
            default: null,
            type: cc.Prefab,
            tooltip: '板'
        },
        blockParent: {
            default: null,
            type: cc.Node,
            tooltip: '背景'
        },
        score: {
            default: null,
            type: cc.Label,
            tooltip: '分数'
        },
        tag: {
            default: 0,
            type: cc.Integer,
            tooltip: '标签'
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this.score.string = 0;
        this.gameStart = 0;
        this.blockSpeed = 350;
        this.blockList = [];
        this.lastPos = null;

        _global2.default.FitHelper.fitFun(this.bg);
        this.initPhysics();
        this.initBlock();
        this.node.on('touchstart', this.acc, this);
        cc.systemEvent.on('collider', this.collider, this);
    },
    onDestroy: function onDestroy() {
        this.node.off('touchstart', this.acc, this);
        cc.systemEvent.off('collider', this.collider, this);
    },


    initPhysics: function initPhysics() {
        var manager = cc.director.getPhysicsManager();
        manager.enabled = true;
        manager.gravity = cc.v2(0, -2400);
    },

    initBlock: function initBlock() {
        this.lastPos = cc.v2(this.ball.x, 0);
        var block = null;
        for (var i = 0; i < 6; i++) {
            block = cc.instantiate(this.blockPrefab);
            block.parent = this.blockParent;
            block.setPosition(this.lastPos);
            this.blockList.push(block);
            this.lastPos.x += 280;
        }
    },
    acc: function acc() {
        if (this.ball.getComponent('ball').initSpeed) {
            var rigidBody = this.ball.getComponent(cc.RigidBody);
            rigidBody.linearVelocity = cc.v2(0, -1200);
            if (this.gameStart == 0) this.gameStart = 1;
        }
    },
    collider: function collider() {
        if (this.gameStart) {
            this.score.string = parseInt(this.score.string) + 1;
            this.blockSpeed += 5;
            this.gameStart = 2;
        }
    },
    getLastPos: function getLastPos() {
        var pos = 0;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = this.blockList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var block = _step.value;

                if (block.x > pos) pos = block.x;
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        return pos;
    },
    update: function update(dt) {
        var _this = this;

        if (this.gameStart > 1) {
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = this.blockList[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var block = _step2.value;

                    block.x += -1 * this.blockSpeed * dt;
                    if (block.x < -1 * cc.winSize.width / 2 - 280) {
                        block.x = this.getLastPos() + 280;
                        block.emit('init', {});
                    }
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }
        }

        if (this.ball.y < -200 && !this.tag) {
            this.tag = 1;
            var max = _global2.default.HttpHelper.httpPost(_global2.default.urlConf.mini_play, { userId: _global2.default.userData.id, token: _global2.default.userData.token, gameId: 1, point: this.score.string }, function (rsp) {
                if (rsp == -1) {
                    return;
                }

                if (rsp.code == 200) {
                    _global2.default.clientAttrData.initClientAttrData(rsp.data.clientAttr);
                    _global2.default.miniGameData.playData(rsp.data.miniGame);
                    _this.tipFrame.emit('show', { now: _this.score.string, max: _global2.default.miniGameData.miniGame[1]['point'] });
                } else {
                    return;
                }
            });
        }
    }
});

cc._RF.pop();