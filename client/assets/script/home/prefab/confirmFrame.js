cc.Class({
    extends: cc.Component,

    properties: {
        gainLab: {
            default: null,
            type: cc.Label,
            tooltip: '标签'
        }, 
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on('init',this.init,this);
    },

    start () {

    },

    init(data){
        this.gainLab.string = data['gold'];
    },

    onButtonClick(target,data){
        this.node.destroy();
    },

    // update (dt) {},
});
