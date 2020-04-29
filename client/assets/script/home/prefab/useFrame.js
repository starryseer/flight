import global from './../../global/global';
cc.Class({
    extends: cc.Component,

    properties: {
        bg:{
            default: null,
            type: cc.Node,
            tooltip: '背景'
        },
        slide:{
            default: null,
            type: cc.Slider,
            tooltip: '滑动条'
        },
        itemSprite:{
            default: null,
            type: cc.Sprite,
            tooltip: '图标'
        },
        itemAtlas:{
            default: null,
            type: cc.SpriteAtlas,
            tooltip: '道具plist'
        },
        nameLab:{
            default: null,
            type: cc.Label,
            tooltip: '名字'
        },
        numLab:{
            default: null,
            type: cc.Label,
            tooltip: '数量'
        },
        id:{
            default: 0,
            type: cc.Integer,
            tooltip: 'id'
        },
        maxNum:{
            default: 0,
            type: cc.Integer,
            tooltip: '最大数量'
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        global.FitHelper.onEnable(this.bg);
        this.node.on('init',this.init,this);
    },

    start () {
        if(this.slide == null){
            return;
        }

        this.slide.node.on('slide', this.onSlide, this);
    },

    init(data)
    {
        var data = global.itemData.items[data['id']];
        var config = global.configConf['item'][data['item_id']];
        this.maxNum = data['num'] >99?99:data['num'];
        this.id = data['id'];
        this.numLab.string = this.maxNum;
        this.nameLab.string = config['name'];
        var oldSize = this.itemSprite.node.width;
        this.itemSprite.spriteFrame = this.itemAtlas.getSpriteFrame(config['image']);
        var newSize = this.itemSprite.node.width;
        this.itemSprite.node.scale = oldSize/newSize;
    },

    onSlide(event){
        var num = Math.round(this.slide.progress*this.maxNum);
        this.numLab.string = num;
        this.slide.progress = num/this.maxNum;
    },

    onPlusClick(target,data)
    {
        this.numLab.string = (parseInt(this.numLab.string) < this.maxNum)?(parseInt(this.numLab.string)+1):this.maxNum;
        this.slide.progress = parseInt(this.numLab.string)/this.maxNum;
    },

    onMinusClick(target,data)
    {
        this.numLab.string = (parseInt(this.numLab.string) > 0)?(parseInt(this.numLab.string)-1):0;
        this.slide.progress = parseInt(this.numLab.string)/this.maxNum;
    },

    onSubmitClick(target,data){
        if(parseInt(this.numLab.string) == 0)
            return;
        
        var param = {'id':this.id,'num':parseInt(this.numLab.string),'userId':global.userData.id,'token':global.userData.token};
        global.HttpHelper.httpPost(global.urlConf.item_consume,param,(rsp)=>{
            if(rsp == -1)
            {
                return;
            }

            if(rsp.code == 200)
            {
                global.clientAttrData.initClientAttrData(rsp.data.clientAttr);
                global.itemData.update([rsp.data.consume]);
                cc.systemEvent.emit('updateItems',rsp.data.consume);
                for(var index in rsp.data.get)
                {
                    global.itemData.update([rsp.data.get[index]]);
                    cc.systemEvent.emit('updateItems',rsp.data.get[index]);
                }
                cc.systemEvent.emit('useConfirm',{'show':rsp.data.show});
                this.node.destroy();
            }
            else
            {
                return;
            }
        });

    },

    onCloseClick(target,data)
    {
        this.node.destroy();
    }

    // update (dt) {},
});
