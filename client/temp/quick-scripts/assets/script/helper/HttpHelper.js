(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/helper/HttpHelper.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'db9a6jsnPtCQJGropV/E+LI', 'HttpHelper', __filename);
// script/helper/HttpHelper.js

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Http 请求封装
 */
var Http = cc.Class({
    extends: cc.Component,

    statics: {},

    properties: {},

    /**
     * get请求
     * @param {string} url 
     * @param {function} callback 
     */
    httpGet: function httpGet(url, callback) {
        // cc.myGame.gameUi.onShowLockScreen();
        var xhr = cc.loader.getXMLHttpRequest();
        xhr.onreadystatechange = function () {
            // cc.log("Get: readyState:" + xhr.readyState + " status:" + xhr.status);
            if (xhr.readyState === 4 && xhr.status == 200) {
                var respone = xhr.responseText;
                var rsp = JSON.parse(respone);
                // cc.myGame.gameUi.onHideLockScreen();
                callback(rsp);
            } else if (xhr.readyState === 4 && xhr.status == 401) {
                // cc.myGame.gameUi.onHideLockScreen();
                callback({ status: 401 });
            } else {
                //callback(-1);
            }
        };
        xhr.withCredentials = true;
        xhr.open('GET', url, true);

        // if (cc.sys.isNative) {
        xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
        xhr.setRequestHeader('Access-Control-Allow-Methods', 'GET, POST');
        xhr.setRequestHeader('Access-Control-Allow-Headers', 'x-requested-with,content-type,authorization');
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader('Authorization', 'Bearer ' /*+ cc.myGame.gameManager.getToken()*/);
        // xhr.setRequestHeader('Authorization', 'Bearer ' + "");
        // }

        // note: In Internet Explorer, the timeout property may be set only after calling the open()
        // method and before calling the send() method.
        xhr.timeout = 8000; // 8 seconds for timeout

        xhr.send();
    },


    /**
     * post请求
     * @param {string} url 
     * @param {object} params 
     * @param {function} callback 
     */
    httpPost: function httpPost(url, params, callback) {
        //        console.log(JSON.stringify(params));
        params = JSON.stringify(params).replace(/{/g, '');
        params = params.replace(/}/g, '');
        params = params.replace(/"/g, '');
        params = params.replace(/'/g, '');
        params = params.replace(/:/g, '=');
        params = params.replace(/,/g, '&');
        console.log(params);
        // cc.myGame.gameUi.onShowLockScreen();
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            // cc.log('xhr.readyState=' + xhr.readyState + '  xhr.status=' + xhr.status);
            if (xhr.readyState === 4) {
                if (xhr.status == 200) {
                    var response = xhr.responseText;
                    var rsp = JSON.parse(response);
                    cc.log(rsp);
                    // cc.myGame.gameUi.onHideLockScreen();
                    callback(rsp);
                } else {
                    callback(-1);
                }
            }
        };
        xhr.open('POST', url, true);
        // if (cc.sys.isNative) {
        // xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
        // xhr.setRequestHeader('Access-Control-Allow-Methods', 'GET, POST');
        // xhr.setRequestHeader('Access-Control-Allow-Headers', 'x-requested-with,content-type');
        // xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
        // xhr.setRequestHeader('Authorization', 'Bearer '/* + cc.myGame.gameManager.getToken()*/);
        // }

        // note: In Internet Explorer, the timeout property may be set only after calling the open()
        // method and before calling the send() method.
        xhr.timeout = 8000; // 8 seconds for timeout

        xhr.send(params);
    },


    /**
     * 登录
     * @param {string} accountLoginUrl
     * @param {string} loginUrl
     * @param {object} params 
     * @param {function} callback 
     * @param {string} account 
     * @param {string} password 
     */
    httpPostLogin: function httpPostLogin(accountLoginUrl, loginUrl, params, callback, account, password) {
        this.httpPost(accountLoginUrl, params, function (response) {
            if (response != -1) {
                this.httpPost(loginUrl, {
                    userId: response.data.user.id,
                    token: response.data.user.token
                }, function (res) {
                    console.log(res);
                }.bind(this));
            }
        }.bind(this));
    }
}

// /**
//  * 登录专用
//  * @param {string} url
//  * @param {object} params 
//  * @param {function} callback 
//  * @param {string} account 
//  * @param {string} password 
//  */
// httpPostLogin(url, params, callback, account, password) {
//     // cc.myGame.gameUi.onShowLockScreen();
//     let xhr = cc.loader.getXMLHttpRequest();
//     xhr.onreadystatechange = function () {
//         // cc.log('xhr.readyState=' + xhr.readyState + '  xhr.status=' + xhr.status);
//         if (xhr.readyState === 4 && xhr.status == 200) {
//             let respone = xhr.responseText;
//             let rsp = JSON.parse(respone);
//             // cc.myGame.gameUi.onHideLockScreen();
//                 callback(rsp);
//             } else {
//             callback(-1);
//         }
//     };
//     xhr.open('POST', url, true);
//     xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
//     xhr.setRequestHeader('Access-Control-Allow-Methods', 'GET, POST');
//     xhr.setRequestHeader('Access-Control-Allow-Headers', 'x-requested-with,content-type');
//     xhr.setRequestHeader("Content-Type", "application/json");
//     let str = account + "@" + password;
//     xhr.setRequestHeader('Authorization', 'Basic' + ' ' + window.btoa(str));

//     xhr.timeout = 8000;// 8 seconds for timeout

//     xhr.send(JSON.stringify(params));

// }
);
var HttpHelper = new Http();
exports.default = HttpHelper;
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
        //# sourceMappingURL=HttpHelper.js.map
        