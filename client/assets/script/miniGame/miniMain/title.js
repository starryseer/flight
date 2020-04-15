import global from "./../../global/global";
cc.Class({
    extends: cc.Component,

    properties: {
        goldLab: {
            default: null,
            type: cc.Label,
            tooltip: '金币标签'
        },
        moodLab: {
            default: null,
            type: cc.Label,
            tooltip: '心情标签'
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //this.init();
        this.node.on('update',this.init,this);
    },

    init(){
        this.goldLab.string = global.clientAttrData.gold;
        this.moodLab.string = Math.floor((global.clientAttrData.mood + 200) / 400 * 100) + "%";
    },


    onBackClick(target,data){
        cc.director.loadScene('home');
    },

    // update (dt) {},
});
