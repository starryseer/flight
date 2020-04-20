import global from "./../../global/global";
cc.Class({
    extends: cc.Component,

    properties: {
        bg: {
            default: null,
            type: cc.Node,
            tooltip: '背景'
        },
        bagFrame: {
            default: null,
            type: cc.Node,
            tooltip: '背包框'
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        global.FitHelper.onEnable(this.bg);
        cc.systemEvent.on('bagShow',this.show,this);
    },

    onDestroy(){
        cc.systemEvent.off('bagShow',this.show,this);
    },

    start () {
        this.fade();
    },

    show(){
        this.node.active = true;
        this.bagFrame.emit('init',{});
    },

    fade(){
        this.node.active = false;
    },

    onCloseClick(target,data){
        this.fade();
    },

    // update (dt) {},
});
