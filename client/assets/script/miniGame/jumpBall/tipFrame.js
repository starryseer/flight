import global from "./../../global/global"
cc.Class({
    extends: cc.Component,

    properties: {
        nowLab: {
            default: null,
            type: cc.Label,
            tooltip: '本次得分'
        },
        maxLab: {
            default: null,
            type: cc.Label,
            tooltip: '最高得分'
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on('show',(data)=>{
            this.node.setPosition(cc.v2(0,0));
            this.nowLab.string  = data.now;
            this.maxLab.string  = data.max;
        });
        this.node.on('fade',(data)=>{
            this.node.setPosition(cc.v2(2000,0));
        });
    },

    onButtonClick(target,data)
    {
        if(data == 1)
            cc.director.loadScene('jumpBall');
        else
            cc.director.loadScene('miniMain');
        
    },

    onDestroy(){
        
    },

 
});
