import global from './../global/global';
cc.Class({
    extends: cc.Component,

    properties: {
        bg: {
            default: null,
            type: cc.Node,
            tooltip: '背景'
        },
        fen: {
            default: null,
            type: cc.Label,
            tooltip: '份数'
        },
        total: {
            default: null,
            type: cc.Label,
            tooltip: '总数'
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        global.FitHelper.fitFun(this.bg);
        global.FitHelper.onEnable(this.bg);
        cc.systemEvent.on('submitShow',this.show,this);
    },

    onDestroy(){
        cc.systemEvent.off('submitShow',this.show,this);
    },

    start () {

    },

    show(data){
        this.node.setPosition(cc.v2(0,0));
        this.fen.string = data;
        this.total.string = data * 100;
    },

    fade(){
        this.node.setPosition(cc.v2(1000,0));
    },

    onCloseClick(target,data){
        this.fade();
    },

    onSubmitClick(){
        var param = {userId:global.userData.id,token:global.userData.token,type:this.fen.string,pool:'drawBasic'};
        global.HttpHelper.httpPost(global.urlConf.shop_draw,param,(rsp)=>{
            if(rsp == -1)
            {
                return;
            }

            if(rsp.code == 200)
            {
                global.clientAttrData.initClientAttrData(rsp.data.clientAttr);
                global.itemData.update(rsp.data.get);
                global.itemData.update(rsp.data.consume);
                this.fade();
                cc.systemEvent.emit('getShow',rsp.data.show);
            }
            else
            {
                return;
            }
        });
    },

    // update (dt) {},
});
