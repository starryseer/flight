import global from './../../global/global';
cc.Class({
    extends: cc.Component,

    properties: {
        infoBg: {
            default: null,
            type: cc.Node,
            tooltip: '个人信息'
        }, 
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

    },

    start () {
        global.FitHelper.onEnable(this.infoBg);
        this.infoBg.active = false;
        this.infoBg.on(cc.Node.EventType.TOUCH_START,this.fade,this);
    },

    onPlayerClick(target,data){
        this.infoBg.active = true;
        this.infoBg.emit('init',{});
    },

    fade()
    {
        this.infoBg.active = false;
    },

    onBagClick(target,data){
        cc.systemEvent.emit('bagShow',{});
        this.infoBg.active = false;
    },

    // update (dt) {},
});
