import global from "./../../global/global";
cc.Class({
    extends: cc.Component,

    properties: {
        bg: {
            default: null,
            type: cc.Node,
            tooltip: '背景'
        },
        nickname: {
            default: null,
            type: cc.Node,
            tooltip: '昵称界面'
        },
        refirm: {
            default: null,
            type: cc.Node,
            tooltip: '确认界面'
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        global.FitHelper.fitFun(this.bg);
        this.nickname.active = true;
        this.refirm.active = false;
        cc.systemEvent.on('miniInit',this.sceneChange,this);
    },

    onDestroy(){
        cc.systemEvent.off('miniInit',this.sceneChange,this);
    },

    sceneChange(data){
        if(data == 1)
        {
            this.nickname.active = false;
            this.refirm.active = true;
        }
        else if(data ==0)
        {
            this.nickname.active = true;
            this.refirm.active = false;
        }
    },

    onBackClick(target,data)
    {
        cc.director.loadScene('home');
    }

    // update (dt) {},
});
