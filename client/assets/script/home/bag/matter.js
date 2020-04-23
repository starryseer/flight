import global from './../../global/global';
cc.Class({
    extends: cc.Component,

    properties: {
        matterLab: {
            default: null,
            type:cc.Label,
            tooltip: '头部'
        }, 
        arrow: {
            default: null,
            type:cc.Node,
            tooltip: '选择箭头'
        }, 
        unArrow: {
            default: null,
            type:cc.Node,
            tooltip: '未选箭头'
        }, 
        head: {
            default: null,
            type:cc.Node,
            tooltip: '头部'
        }, 
        content: {
            default: null,
            type:cc.Node,
            tooltip: '内容'
        }, 
        itemPrefab:{
            default: null,
            type:cc.Prefab,
            tooltip: '道具预制体'
        }, 
        flag: {
            default: false,
            tooltip: '开关标识'
        }, 
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on('init',this.init,this);
        this.node.on('btnTouch',this.btnTouch,this);
        this.node.on('fade',this.fade,this);
        cc.systemEvent.on('minusBagLab',this.minusBagLab,this);
        cc.systemEvent.on('updateItems',this.updateItems,this);
    },

    start () {

    },

    onDestroy(){
        cc.systemEvent.off('minusBagLab',this.minusBagLab,this);
        cc.systemEvent.off('updateItems',this.updateItems,this);
    },

    btnTouch(){
        if(!this.flag)
        {
            this.show();
        }
        else
        {
            this.fade();
        }
        

    },

    init(){
        this.show();
        this.content.removeAllChildren();
        var num =0;
        for(var index in global.itemData.items)
        {
            if(global.configConf['item'][global.itemData.items[index].item_id]['showType'] == 'matter')
            {
                var item = cc.instantiate(this.itemPrefab);
                item.parent = this.content;
                var param = {
                    num:global.itemData.items[index].num,
                    item_id:global.itemData.items[index].item_id,
                    id:global.itemData.items[index].id,
                    type:global.itemData.items[index].type,
                };
                item.emit('init',param);
                num++;
            }
        }
        this.matterLab.string = num;
        this.fade();
    },

    show(){
        this.flag = true;
        this.head.active = true;
        this.node.active = this.flag;
        this.arrow.active = true;
        this.unArrow.active = false;
    },

    fade(){
        this.flag = false;
        this.head.active = false;
        this.node.active = this.flag;
        this.arrow.active = false;
        this.unArrow.active = true;
    },

    minusBagLab(data)
    {
        if(data['type'] == this.node.name)
            this.matterLab.string = parseInt(this.matterLab.string) - 1;
    },

    updateItems(data)
    {
        if(global.configConf['item'][data['item_id']]['showType'] == 'matter')
        {
            var children = this.content.getChildren();
            for(var index in children)
            {
                children[index].emit('updateItem',data);
            }
        }
    },

    // update (dt) {},
});
