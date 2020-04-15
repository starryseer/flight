import global from "./../../global/global";
cc.Class({
    extends: cc.Component,

    properties: {
        bg: {
            default: null,
            type: cc.Node,
            tooltip: '背景'
        },
        rankInfoPrefab:{
            default: null,
            type: cc.Prefab,
            tooltip: '排名信息预制体'
        },
        rankLayout:{
            default: null,
            type: cc.Node,
            tooltip: '排名栏'
        },
        myRank:{
            default: null,
            type: cc.Node,
            tooltip: '我的排名'
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        global.FitHelper.onEnable(this.node);
        global.FitHelper.fitFun(this.bg);
        this.init();
        cc.systemEvent.on('rankFrameShow',this.show,this);
    },

    onDestroy(){
        cc.systemEvent.off('rankFrameShow',this.show,this);
    },

    init(){
        this.fade();
    },

    show(){

        var param = {
            userId:global.userData.id,
            token:global.userData.token,
            gameId:1
        };
        global.HttpHelper.httpPost(global.urlConf.mini_rank,param,(rsp)=>{
            if(rsp.code == 200)
            {
                this.rankLayout.removeAllChildren();
                var rankList = rsp.data.rankList;
                for(var rank in rankList)
                {
                    var rankInfo = cc.instantiate(this.rankInfoPrefab);
                    var param = {
                        rank:parseInt(rank)+1,
                        point:rankList[rank]['point'],
                        nickname:rankList[rank]['nickname']
                    };
                    this.rankLayout.addChild(rankInfo);
                    rankInfo.emit('init',param);
                }
                var rankInfo = cc.instantiate(this.rankInfoPrefab);
                var param = {
                    rank:rsp.data.rank,
                    point:rsp.data.point,
                    nickname:global.clientAttrData.nickname
                };
                this.myRank.addChild(rankInfo);
                rankInfo.emit('init',param);
            }
        });
        this.node.setPosition(cc.v2(0,0));
    },

    fade(){
        //global.FitHelper.onDisable();
        this.node.setPosition(cc.v2(1200,0));
    },

    onCloseClick(){
        this.fade();
    },

   


    // update (dt) {},
});
