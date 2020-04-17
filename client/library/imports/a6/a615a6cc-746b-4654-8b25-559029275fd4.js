"use strict";
cc._RF.push(module, 'a615abMdGtGVIslVZApJ1/U', 'home');
// script/home/home.js

"use strict";

var _global = require("../global/global");

var _global2 = _interopRequireDefault(_global);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

cc.Class({
    extends: cc.Component,

    properties: {},

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this.loadConfig();
        this.initCollision();
        this.initPhysics();
    },
    loadConfig: function loadConfig() {
        cc.loader.loadResDir("config", function (err, dir) {
            if (err) return;
            for (var i = 0; i < dir.length; i++) {
                cc.loader.loadRes('config/' + dir[i].name.trim() + '.json', function (error, json) {
                    _global2.default.configConf[json.name] = json.json;
                });
            }
        });
    },
    initCollision: function initCollision() {
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
    },
    initPhysics: function initPhysics() {
        var manager = cc.director.getPhysicsManager();
        manager.enabled = true;
        manager.gravity = cc.v2(0, 0);
        // manager.enabledDebugDraw = true;
    }
}

// update (dt) {},
);

cc._RF.pop();