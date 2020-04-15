"use strict";
cc._RF.push(module, 'c2e71mkp0pGXJRpc2UGvTaf', 'rankFrame');
// script/miniGame/miniMain/rankFrame.js

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
        rankInfoPrefab: {
            default: null,
            type: cc.Prefab,
            tooltip: '排名信息预制体'
        },
        rankLayout: {
            default: null,
            type: cc.Node,
            tooltip: '排名栏'
        },
        myRank: {
            default: null,
            type: cc.Node,
            tooltip: '我的排名'
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        _global2.default.FitHelper.onEnable(this.node);
        _global2.default.FitHelper.fitFun(this.bg);
        this.init();
        cc.systemEvent.on('rankFrameShow', this.show, this);
    },
    onDestroy: function onDestroy() {
        cc.systemEvent.off('rankFrameShow', this.show, this);
    },
    init: function init() {
        this.fade();
    },
    show: function show() {
        var _this = this;

        var param = {
            userId: _global2.default.userData.id,
            token: _global2.default.userData.token,
            gameId: 1
        };
        _global2.default.HttpHelper.httpPost(_global2.default.urlConf.mini_rank, param, function (rsp) {
            if (rsp.code == 200) {
                _this.rankLayout.removeAllChildren();
                var rankList = rsp.data.rankList;
                for (var rank in rankList) {
                    var rankInfo = cc.instantiate(_this.rankInfoPrefab);
                    var param = {
                        rank: parseInt(rank) + 1,
                        point: rankList[rank]['point'],
                        nickname: rankList[rank]['nickname']
                    };
                    _this.rankLayout.addChild(rankInfo);
                    rankInfo.emit('init', param);
                }
                var rankInfo = cc.instantiate(_this.rankInfoPrefab);
                var param = {
                    rank: rsp.data.rank,
                    point: rsp.data.point,
                    nickname: _global2.default.clientAttrData.nickname
                };
                _this.myRank.addChild(rankInfo);
                rankInfo.emit('init', param);
            }
        });
        this.node.setPosition(cc.v2(0, 0));
    },
    fade: function fade() {
        //global.FitHelper.onDisable();
        this.node.setPosition(cc.v2(1200, 0));
    },
    onCloseClick: function onCloseClick() {
        this.fade();
    }
}

// update (dt) {},
);

cc._RF.pop();