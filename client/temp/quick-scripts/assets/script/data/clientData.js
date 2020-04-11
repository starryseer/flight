(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/data/clientData.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '66e0b5YvG1Hy4GgvHVFkjV7', 'clientData', __filename);
// script/data/clientData.js

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var clientData = function clientData() {
    var that = {};
    that.create_channel = null;
    that.login_account = null;
    that.status = null;
    that.user_id = null;

    that.initClientData = function (client) {
        that.create_channel = client.create_channel;
        that.login_account = client.login_account;
        that.status = client.status;
        that.user_id = client.user_id;
    };

    return that;
};
exports.default = clientData;
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
        //# sourceMappingURL=clientData.js.map
        