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
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //this.init();
        var avatarUrl = global.imageConf.avatar[global.clientAttrData.avatar];
        cc.loader.load({ url:avatarUrl, type: 'png' }, (error, purl) => {
            let oldSize = this.avatar.node.width;
            this.avatar.spriteFrame = new cc.SpriteFrame(purl)
            let newSize = this.avatar.node.width;
            this.avatar.node.scale = oldSize/newSize/2;
        });
        this.node.on('update',this.update,this);
        cc.systemEvent.on('updateUserInfo',this.init,this);
    },

    onDestroy(){
        cc.systemEvent.off('updateUserInfo',this.init,this);
    },

    update(){
        this.nicknameLab.string = global.clientAttrData.nickname?global.clientAttrData.nickname:"";
        this.signatureLab.string = global.clientAttrData.signature?global.clientAttrData.signature:"";
    },

    init()
    {
        this.nicknameLab.string = global.clientAttrData.nickname?global.clientAttrData.nickname:"";
        this.signatureLab.string = global.clientAttrData.signature?global.clientAttrData.signature:"";

    },

    onModifyClick(target,data)
    {
        this.editFrame.emit('show',{});
    },

    // update (dt) {},
});
