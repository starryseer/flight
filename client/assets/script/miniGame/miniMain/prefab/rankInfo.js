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
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on('init',this.init,this);
    },

    init(data)
    {
        var avatarUrl = global.imageConf.avatar[global.clientAttrData.avatar];
        cc.loader.load({ url:avatarUrl, type: 'png' }, (error, purl) => {
            let oldSize = this.avatar.node.width;
            this.avatar.spriteFrame = new cc.SpriteFrame(purl)
            let newSize = this.avatar.node.width;
            this.avatar.node.scale = oldSize/newSize/2;
        });
        this.rankLab.string     = data.rank;
        this.pointLab.string    = data.point;
        this.nicknameLab.string = data.nickname;
    },

    // update (dt) {},
});
