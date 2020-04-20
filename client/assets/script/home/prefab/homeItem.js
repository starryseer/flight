import global from './../../global/global';
cc.Class({
    extends: cc.Component,

    properties: {
        itemAtlas:{
            default: null,
            type: cc.SpriteAtlas,
            tooltip: '道具plist'
        },
        itemSprite:{
            default: null,
            type: cc.Sprite,
            tooltip: '道具图片'
        },
        itemLab:{
            default: null,
            type: cc.Label,
            tooltip: '道具数量'
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on('init',this.init,this);
    },

    start () {

    },

    init(data){
        this.itemSprite.spriteFrame = this.itemAtlas.getSpriteFrame(global.configConf['item'][data['item_id']]['image']);
        this.itemLab.string = '✖' + data['num'];
    },

    // update (dt) {},
});
