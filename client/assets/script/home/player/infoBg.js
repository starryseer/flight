import global from './../../global/global';
cc.Class({
    extends: cc.Component,

    properties: {
        bag: {
            default: null,
            type: cc.Node,
            tooltip: '背包'
        }, 
        mood: {
            default: null,
            type: cc.Node,
            tooltip: '心情'
        }, 
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.active = false;
        this.node.on('init',this.init,this);
        global.FitHelper.onEnable(this.node);
        this.node.on(cc.Node.EventType.TOUCH_START,this.fade,this);
    },

    start () {

    },

    init(){
        

    },

    fade()
    {
        this.node.active = false;
    }



    // update (dt) {},
});
