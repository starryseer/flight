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
        this.infoBg.active = false;
    },

    onPlayerClick(target,data){
        this.infoBg.active = true;
        this.infoBg.emit('init',{});
    },

    // update (dt) {},
});
