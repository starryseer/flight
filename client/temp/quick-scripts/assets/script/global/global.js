(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/global/global.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '6c2a5m2b/FN+6NRWdhiqr5T', 'global', __filename);
// script/global/global.js

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _userData = require('./../data/userData');

var _userData2 = _interopRequireDefault(_userData);

var _clientData = require('./../data/clientData');

var _clientData2 = _interopRequireDefault(_clientData);

var _clientAttrData = require('./../data/clientAttrData');

var _clientAttrData2 = _interopRequireDefault(_clientAttrData);

var _miniGameData = require('./../data/miniGameData');

var _miniGameData2 = _interopRequireDefault(_miniGameData);

var _itemData = require('./../data/itemData');

var _itemData2 = _interopRequireDefault(_itemData);

var _urlConf = require('./../config/urlConf');

var _urlConf2 = _interopRequireDefault(_urlConf);

var _triggerConf = require('./../config/triggerConf');

var _triggerConf2 = _interopRequireDefault(_triggerConf);

var _HttpHelper = require('./../helper/HttpHelper');

var _HttpHelper2 = _interopRequireDefault(_HttpHelper);

var _FitHelper = require('./../helper/FitHelper');

var _FitHelper2 = _interopRequireDefault(_FitHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var global = {} || global;

global.userData = (0, _userData2.default)();
global.clientData = (0, _clientData2.default)();
global.clientAttrData = (0, _clientAttrData2.default)();
global.itemData = (0, _itemData2.default)();
global.miniGameData = (0, _miniGameData2.default)();
global.urlConf = (0, _urlConf2.default)();
global.triggerConf = (0, _triggerConf2.default)();
global.HttpHelper = _HttpHelper2.default;
global.FitHelper = (0, _FitHelper2.default)();
exports.default = global;
module.exports = exports['default'];

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
        //# sourceMappingURL=global.js.map
        