import global from './../../../global/global';
cc.Class({
    extends: cc.Component,

    properties: {
        rankLab: {
            default: null,
            type: cc.Label,
            tooltip: '排名'
        },
        pointLab: {
            default: null,
            type: cc.Label,
            tooltip: '分数'
        },
        nicknameLab: {
            default: null,
            type: cc.Label,
            tooltip: '昵称'
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
        this.node.on('init',this.init,this);
    },

    init(data)
    {
        this.loadAvatar();
        this.rankLab.string     = data.rank;
        this.pointLab.string    = data.point;
        this.nicknameLab.string = data.nickname;
    },

    loadAvatar()
    {
        let oldSize = this.avatar.node.width;
        this.avatar.spriteFrame = this.headAtlas.getSpriteFrame(global.imageConf.avatar[global.clientAttrData.avatar]);
        let newSize = this.avatar.node.width;
        this.avatar.node.scale = oldSize/newSize/2;
    },

    // update (dt) {},
});
