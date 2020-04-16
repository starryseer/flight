import global from './../global/global';
cc.Class({
    extends: cc.Component,

    properties: {
        bg: {
            default: null,
            type: cc.Node,
            tooltip: '背景'
        },
        layout:{
            default: null,
            type: cc.Node,
            tooltip: '显示框'
        },
        item:{
            default: null,
            type: cc.Prefab,
            tooltip: '道具预制体'
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        global.FitHelper.onEnable(this.bg);
        cc.systemEvent.on('getShow',this.show,this);
    },

    onDestroy(){
        cc.systemEvent.off('getShow',this.show,this);
    },

    show(data){
        this.node.setPosition(cc.v2(0,0));
        this.layout.removeAllChildren();
        for(var index in data)
        {
            var item = cc.instantiate(this.item);
            item.parent = this.layout;
            item.emit('init',data[index]);
            item.opacity = 0;
            item.runAction(cc.sequence(cc.delayTime(index/10),cc.fadeIn(0.1)));
        }
        cc.systemEvent.emit('mainInit',{});
    },

    fade(){
        this.node.setPosition(cc.v2(2000,0));
    },

    onCloseClick(target,data)
    {
        this.fade();
    },

    // update (dt) {},
});
