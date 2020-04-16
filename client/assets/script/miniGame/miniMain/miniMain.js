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
        editFrame: {
            default: null,
            type: cc.Node,
            tooltip: '编辑框'
        },
        rankFrame: {
            default: null,
            type: cc.Node,
            tooltip: '排名框'
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        if(!global.clientAttrData.nickname)
        {
            cc.director.loadScene('miniInit');
            return;
        }
        global.FitHelper.fitFun(this.bg);
    },

    start(){
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

    onDestroy(){
    },
    
    initData(rsp)
    {
        global.clientAttrData.initClientAttrData(rsp.data.clientAttr);
        global.miniGameData.initMiniGameData(rsp.data.miniGame);
    },

    initLab()
    {
        this.title.emit('update',{});
        this.rankList.emit('update',{});
        this.userInfo.emit('update',{});
    }


    // update (dt) {},
});
