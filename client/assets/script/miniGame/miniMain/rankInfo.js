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
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on('init',this.init,this);
    },

    init(data)
    {
        this.rankLab.string     = data.rank;
        this.pointLab.string    = data.point;
        this.nicknameLab.string = data.nickname;
    },

    // update (dt) {},
});
