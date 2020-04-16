import global from "./../global/global";
cc.Class({
    extends: cc.Component,

    properties: {
        bg: {
            default: null,
            type: cc.Node,
            tooltip: '背景'
        },
        num: {
            default: null,
            type: cc.Label,
            tooltip: '数量'
        },
        gold: {
            default: null,
            type: cc.Label,
            tooltip: '金币'
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        global.FitHelper.fitFun(this.bg);
        this.init();
        cc.systemEvent.on('mainInit',this.init,this);
    },

    onDestroy(){
        cc.systemEvent.off('mainInit',this.init,this);
    },

    start () {
        var param = {userId:global.userData.id,token:global.userData.token};
        global.HttpHelper.httpPost(global.urlConf.clientAttr,param,(rsp)=>{
            if(rsp == -1)
            {
                return;
            }

            if(rsp.code == 200)
            {
                global.clientAttrData.initClientAttrData(rsp.data.clientAttr);
                this.init();
            }
            else
            {
                return;
            }
        });
    },

    init(){
        this.gold.string = global.clientAttrData.gold;

    },

    onBackClick(target,data){
        cc.director.loadScene('home');
    },

    onPlusClick(target,data){
        var num = parseInt(this.num.string);
        if(num <9)
        {
            num++;
            this.num.string = num;
        }
    }, 

    onMinusClick(target,data){
        var num = parseInt(this.num.string);
        if(num >1)
        {
            num--;
            this.num.string = num;
        }
    }, 

    onBuyClick(target,data)
    {
        cc.systemEvent.emit('submitShow',parseInt(this.num.string));
    },

    onBuyTenClick(target,data)
    {
        cc.systemEvent.emit('submitShow',10);
    },

    // update (dt) {},
});
