import global from "../../global/global";

cc.Class({
    extends: cc.Component,

    properties: {
        matter: {
            default: null,
            type: cc.Node,
            tooltip: '食材框'
        }, 
        food: {
            default: null,
            type: cc.Node,
            tooltip: '食物框'
        }, 
        item: {
            default: null,
            type: cc.Node,
            tooltip: '道具框'
        }, 
        itemParent: {
            default: null,
            type: cc.Node,
            tooltip: '信息框'
        },
        infoPrefab: {
            default: null,
            type: cc.Prefab,
            tooltip: '信息框'
        },
        saleConfirmFrame:{
            default: null,
            type: cc.Prefab,
            tooltip: '成功回调框'
        },
        saleFrame:{
            default: null,
            type: cc.Prefab,
            tooltip: '出售物品框'
        },
        useFrame:{
            default: null,
            type: cc.Prefab,
            tooltip: '使用物品框'
        },
        useConfirmFrame:{
            default: null,
            type: cc.Prefab,
            tooltip: '使用物品框'
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        global.FitHelper.fitUnit(this.node);
    },

    start () {
        this.node.on('init',this.init,this);
        cc.systemEvent.on('showInfo',this.showInfo,this);
        cc.systemEvent.on('fadeInfo',this.fadeInfo,this);
        cc.systemEvent.on('showDealFrame',this.showDealFrame,this);
        cc.systemEvent.on('saleConfirm',this.saleConfirm,this);
        cc.systemEvent.on('useConfirm',this.useConfirm,this);
        this.init();
    },

    init(){
        this.matter.emit('init',{});
        this.food.emit('init',{});
        this.item.emit('init',{});
        this.itemParent.removeAllChildren();
        this.animate();
    },

    onDestroy(){
        cc.systemEvent.off('showInfo',this.showInfo,this);
        cc.systemEvent.off('fadeInfo',this.fadeInfo,this);
        cc.systemEvent.off('showDealFrame',this.showDealFrame,this);
        cc.systemEvent.off('saleConfirm',this.saleConfirm,this);
        cc.systemEvent.off('useConfirm',this.useConfirm,this);
    },

    animate(){
        this.node.setPosition(cc.v2(-650,0));
        this.node.runAction(cc.moveTo(0.5,cc.v2(0,0)));
    },

    showInfo(data){
        this.fadeInfo();
        var info = cc.instantiate(this.infoPrefab);
        info.parent = this.itemParent;
        if(data['pos'].x >-100)
            data['pos'].x = -100;
        
        if(data['pos'].y <-130)
            data['pos'].y = -130;   
        
        info.setPosition(data['pos']);
        info.emit('init',data);
    },

    fadeInfo(){
        this.itemParent.removeAllChildren();
    },

    showDealFrame(data)
    {
        switch(data['type'])
        {
            case 'sale':
                var saleFrame = cc.instantiate(this.saleFrame);
                saleFrame.parent = this.itemParent;
                saleFrame.emit('init',data);
                break;
            case 'use':
                var useFrame = cc.instantiate(this.useFrame);
                useFrame.parent = this.itemParent;
                useFrame.emit('init',data);
                break;
            default:
                cc.director.loadScene('cook');
        }
    },

    saleConfirm(gold){
        var frame = cc.instantiate(this.saleConfirmFrame);
        frame.parent = this.itemParent;
        frame.emit('init',{'gold':gold});
    },

    useConfirm(data){
        var frame = cc.instantiate(this.useConfirmFrame);
        frame.parent = this.itemParent;
        frame.emit('init',data);
    },

    onButtonClick(target,data){
        switch(parseInt(data)){
            case 1:
                this.matter.emit('btnTouch',{});
                this.food.emit('fade',{});
                this.item.emit('fade',{});
                break;
            case 2:
                this.matter.emit('fade',{});
                this.food.emit('btnTouch',{});
                this.item.emit('fade',{});
                break; 
            case 3:
                this.matter.emit('fade',{});
                this.food.emit('fade',{});
                this.item.emit('btnTouch',{});
                break;          
        }
    },

    



    // update (dt) {},
});
