import global from './../../../global/global'
cc.Class({
    extends: cc.Component,

    properties: {
        avatar:{
            default: null,
            type: cc.Sprite,
            tooltip: '头像'
        },
        chosen:{
            default: null,
            type: cc.Node,
            tooltip: '被选中'
        },
        headAtlas:{
            default: null,
            type: cc.SpriteAtlas,
            tooltip: '头像plist'
        },
        tag:{
            default: -1,
            type: cc.Integer,
            tooltip: '标签'
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on('init',this.init,this);
        cc.systemEvent.on('avatarChosen',this.avatarChosen,this);
    },

    onDestroy(){
        cc.systemEvent.off('avatarChosen',this.avatarChosen,this);
    },

    start () {

    },

    init(tag){
        this.tag = tag;
        this.isChosen();
        this.loadAvatar(tag);  
    },

    loadAvatar(tag)
    {
        let oldSize = this.avatar.node.width;
        this.avatar.spriteFrame = this.headAtlas.getSpriteFrame(global.imageConf.avatar[tag]);
        let newSize = this.avatar.node.width;
        this.avatar.node.scale = oldSize/newSize/2;
    },

    isChosen()
    {
        if(this.tag == global.clientAttrData.avatar)
        {
            this.chosen.active = true;
        }
        else
            this.chosen.active = false;
    
    },

    onButtonClick(target,data){
        cc.systemEvent.emit('avatarChosen',this.tag);
    },

    avatarChosen(data)
    {
        if(data == this.tag)
        {
            this.chosen.active = true;
        }
        else
            this.chosen.active = false;
    }

    // update (dt) {},
});
