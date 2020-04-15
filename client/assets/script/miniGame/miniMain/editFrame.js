import global from "./../../global/global";
cc.Class({
    extends: cc.Component,

    properties: {
        nicknameLab: {
            default: null,
            type: cc.Label,
            tooltip: '昵称'
        },
        signatureBoxLab: {
            default: null,
            type: cc.Label,
            tooltip: '个性签名'
        },
        signatureEditBoxLab: {
            default: null,
            type: cc.EditBox,
            tooltip: '个性签名'
        },
        bg: {
            default: null,
            type: cc.Node,
            tooltip: '背景'
        },
        avatarLayout: {
            default: null,
            type: cc.Node,
            tooltip: '头像选择框'
        },
        avatarPrefab: {
            default: null,
            type: cc.Prefab,
            tooltip: '头像预制体'
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        global.FitHelper.onEnable(this.node);
        global.FitHelper.fitFun(this.bg);
        this.init();

        this.node.on('show',(data)=>{
            this.show();
            this.initData();
        });

        this.node.on('fade',(data)=>{
            this.fade();
        });
    },

    init(){
        this.initData();
        this.fade();
    },

    initData(){
        this.nicknameLab.string = global.clientAttrData.nickname;
        this.signatureBoxLab.string = global.clientAttrData.signature;
        this.signatureEditBoxLab.string = global.clientAttrData.signature;
        this.avatarLayout.removeAllChildren();
        for(var index in global.imageConf.avatar)
        {
            var avatar = cc.instantiate(this.avatarPrefab);
            avatar.parent = this.avatarLayout;
            avatar.emit('init',index);
        }
    },

    show(){

        this.node.setPosition(cc.v2(0,0));
    },

    fade(){
        //global.FitHelper.onDisable();
        this.node.setPosition(cc.v2(2000,0));
    },

    onButtonClick(target,data){
        var children = this.avatarLayout.children;
        var avatar = -1;
        for(var index in children)
        {
            if(children[index].getComponent('avatar').chosen.active)
            {
                avatar = index;
                break;
            }
        }
        
        var param = {
            signature:this.signatureBoxLab.string,
            userId:global.userData.id,
            token:global.userData.token,
            avatar:avatar
        };
        global.HttpHelper.httpPost(global.urlConf.set_signature,param,(rsp)=>{
            if(rsp.code == 200)
            {
                global.clientAttrData.initClientAttrData(rsp.data.clientAttr);
                cc.systemEvent.emit('updateUserInfo',{});
            }
            this.fade();
        });
    },

    onCloseClick(target,data)
    {
        this.fade();
    },


    // update (dt) {},
});
