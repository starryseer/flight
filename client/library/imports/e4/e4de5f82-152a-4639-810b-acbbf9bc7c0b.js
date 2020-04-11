"use strict";
cc._RF.push(module, 'e4de5+CFSpGOYELrLv5vHwL', 'userCtrl');
// script/userCtrl.js

'use strict';

cc.Class({
    extends: cc.Component,
    editor: {
        requireComponent: sp.Skeleton
    },

    properties: {
        mixTime: 0.2
    },

    onLoad: function onLoad() {
        var _this = this;

        var spine = this.spine = this.getComponent('sp.Skeleton');
        this._setMix('walk', 'run');
        this._setMix('run', 'jump');
        this._setMix('walk', 'jump');

        spine.setStartListener(function (trackEntry) {
            var animationName = trackEntry.animation ? trackEntry.animation.name : "";
            cc.log("[track %s][animation %s] start.", trackEntry.trackIndex, animationName);
        });
        spine.setInterruptListener(function (trackEntry) {
            var animationName = trackEntry.animation ? trackEntry.animation.name : "";
            cc.log("[track %s][animation %s] interrupt.", trackEntry.trackIndex, animationName);
        });
        spine.setEndListener(function (trackEntry) {
            var animationName = trackEntry.animation ? trackEntry.animation.name : "";
            cc.log("[track %s][animation %s] end.", trackEntry.trackIndex, animationName);
        });
        spine.setDisposeListener(function (trackEntry) {
            var animationName = trackEntry.animation ? trackEntry.animation.name : "";
            cc.log("[track %s][animation %s] will be disposed.", trackEntry.trackIndex, animationName);
        });
        spine.setCompleteListener(function (trackEntry) {
            var animationName = trackEntry.animation ? trackEntry.animation.name : "";
            if (animationName === 'shoot') {
                _this.spine.clearTrack(1);
            }
            var loopCount = Math.floor(trackEntry.trackTime / trackEntry.animationEnd);
            cc.log("[track %s][animation %s] complete: %s", trackEntry.trackIndex, animationName, loopCount);
        });
        spine.setEventListener(function (trackEntry, event) {
            var animationName = trackEntry.animation ? trackEntry.animation.name : "";
            cc.log("[track %s][animation %s] event: %s, %s, %s, %s", trackEntry.trackIndex, animationName, event.data.name, event.intValue, event.floatValue, event.stringValue);
        });

        this._hasStop = false;
        this.walk();
    },


    // OPTIONS

    toggleDebugSlots: function toggleDebugSlots() {
        this.spine.debugSlots = !this.spine.debugSlots;
    },
    toggleDebugBones: function toggleDebugBones() {
        this.spine.debugBones = !this.spine.debugBones;
    },
    toggleTimeScale: function toggleTimeScale() {
        if (this.spine.timeScale === 1.0) {
            this.spine.timeScale = 0.3;
        } else {
            this.spine.timeScale = 1.0;
        }
    },


    // ANIMATIONS

    stop: function stop() {
        this.spine.clearTrack(0);
        this._hasStop = true;
    },
    walk: function walk() {
        this.spine.setAnimation(0, 'walk', true);
        this._hasStop = false;
    },
    run: function run() {
        this.spine.setAnimation(0, 'run', true);
        this._hasStop = false;
    },
    jump: function jump() {
        var oldAnim = this.spine.animation;
        this.spine.setAnimation(0, 'jump', false);
        if (oldAnim && !this._hasStop) {
            this.spine.addAnimation(0, oldAnim === 'run' ? 'run' : 'walk', true, 0);
        }
    },
    shoot: function shoot() {
        this.spine.setAnimation(1, 'shoot', false);
    },


    //

    _setMix: function _setMix(anim1, anim2) {
        this.spine.setMix(anim1, anim2, this.mixTime);
        this.spine.setMix(anim2, anim1, this.mixTime);
    }
});

cc._RF.pop();