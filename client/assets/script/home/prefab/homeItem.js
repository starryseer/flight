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
        itemId:{
            default: 0,
            type: cc.Integer,
            tooltip: '道具id'
        },
        id:{
            default: 0,
            type: cc.Integer,
            tooltip: 'id'
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
        this.itemId = data['item_id'];
        this.id = parseInt(data['id']);

    },



    onButtonClick(){
        cc.log(this.node.getPosition());
        var data = {
            'item_id':this.itemId,
            'pos':this.node.convertToWorldSpaceAR(cc.v2(-320,-475)),
            'num':parseInt(this.itemLab.string.substr(1)),
            'id':this.id
        };
        cc.systemEvent.emit('showInfo',data);
    },

    // update (dt) {},
});
