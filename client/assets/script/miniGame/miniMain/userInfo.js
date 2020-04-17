import global from "./../../global/global";
cc.Class({
    extends: cc.Component,

    properties: {
        nicknameLab: {
            default: null,
            type: cc.Label,
            tooltip: '昵称标签'
        },
        signatureLab: {
            default: null,
            type: cc.Label,
            tooltip: '签名标签'
        },
        editFrame: {
            default: null,
            type: cc.Node,
            tooltip: '签名标签'
        },
        avatar:{
            default: null,
            type: cc.Sprite,
            tooltip: '头像'
        },
        headAtlas:{
            default: null,
            type: cc.SpriteAtlas,
            tooltip: '头像plist'
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.init();       
        this.node.on('update',this.init,this);
        cc.systemEvent.on('updateUserInfo',this.updateUserInfo,this);
    },

    onDestroy(){
        cc.systemEvent.off('updateUserInfo',this.updateUserInfo,this);
    },

    init()
    {
        this.nicknameLab.string = global.clientAttrData.nickname?global.clientAttrData.nickname:"";
        this.signatureLab.string = global.clientAttrData.signature?global.clientAttrData.signature:"";
        this.loadAvatar(); 

    },

    loadAvatar()
    {
        let oldSize = this.avatar.node.width;
        this.avatar.spriteFrame = this.headAtlas.getSpriteFrame(global.imageConf.avatar[global.clientAttrData.avatar]);
        let newSize = this.avatar.node.width;
        this.avatar.node.scale = oldSize/newSize/2;
    },

    updateUserInfo()
    {
        this.nicknameLab.string = global.clientAttrData.nickname?global.clientAttrData.nickname:"";
        this.signatureLab.string = global.clientAttrData.signature?global.clientAttrData.signature:"";
        this.loadAvatar();
    },

    onModifyClick(target,data)
    {
        this.editFrame.emit('show',{});
    },

    // update (dt) {},
});
