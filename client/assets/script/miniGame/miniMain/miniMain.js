import global from "./../../global/global"
cc.Class({
    extends: cc.Component,

    properties: {
        bg: {
            default: null,
            type: cc.Node,
            tooltip: '背景'
        },
        title: {
            default: null,
            type: cc.Node,
            tooltip: '标题栏'
        },
        userInfo: {
            default: null,
            type: cc.Node,
            tooltip: '用户信息栏'
        },
        rankList: {
            default: null,
            type: cc.Node,
            tooltip: '排名栏'
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var ratio = global.FitHelper.fitFun(this.bg);
        this.init();
    },

    init(){
        var param = {userId:global.userData.id,token:global.userData.token};
        global.HttpHelper.httpPost(global.urlConf.mini_main,param,(rsp)=>{
            if(rsp == -1)
            {
                return;
            }

            if(rsp.code == 200)
            {
                this.initData(rsp);
                this.initLab();
            }
            else
            {
                return;
            }
        });
    },
    
    initData(rsp)
    {
        global.clientAttrData.initClientAttrData(rsp.data.clientAttr);
        global.miniGameData.initMiniGameData(rsp.data.miniGame);
    },

    initLab()
    {
        this.title.emit('init',{});
        this.userInfo.emit('init',{});
        this.rankList.emit('init',{});
    }


    // update (dt) {},
});
