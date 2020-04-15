"use strict";
cc._RF.push(module, '5d1c1M8a/hCi5EGjzWVsvvO', 'refirm');
// script/miniGame/miniInit/refirm.js

'use strict';

var _global = require('./../../global/global');

var _global2 = _interopRequireDefault(_global);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

cc.Class({
    extends: cc.Component,

    properties: {},

    // LIFE-CYCLE CALLBACKS:

    onButtonClick: function onButtonClick(target, data) {
        if (!_global2.default.miniInitCache.getNickname()) {
            cc.systemEvent.emit('miniInit', 0);
        }

        var param = {
            'userId': _global2.default.userData.id,
            'token': _global2.default.userData.token,
            'nickname': _global2.default.miniInitCache.getNickname()
        };

        cc.log(param);

        _global2.default.HttpHelper.httpPost(_global2.default.urlConf.set_nickname, param, function (rsp) {
            if (rsp == -1) {
                return;
            }

            if (rsp.code == 200) {
                _global2.default.clientAttrData.initClientAttrData(rsp.data.clientAttr);
                cc.director.loadScene('miniMain');
            } else {
                return;
            }
        });
    }
}

// update (dt) {},
);

cc._RF.pop();