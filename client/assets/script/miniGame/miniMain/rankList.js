import global from "./../../global/global";
cc.Class({
    extends: cc.Component,

    properties: {
        pointLab: {
            default: null,
            type: cc.Label,
            tooltip: '分数标签'
        },
        gameId: {
            default: 1,
            displayName: 'gameId',
            tooltip: '当前游戏ID',
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on('init',()=>{
            this.pointLab.string = global.miniGameData.miniGame[this.gameId]['point'];
        });
    },

    onRankClick(target,data){
        
    },

    // update (dt) {},
});
