import global from './../../global/global';
cc.Class({
    extends: cc.Component,

    properties: {
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
        this.node.on('btnTouch',this.btnTouch,this);
        this.node.on('fade',this.fade,this);
    },

    start () {

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

    show(){
        this.flag = true;
        this.head.active = true;
        this.node.active = this.flag;
        
        this.content.removeAllChildren();
        for(var index in global.itemData.items)
        {
            if(global.configConf['item'][global.itemData.items[index].item_id]['showType'] == 'food')
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
            }

        }
    },

    fade(){
        this.flag = false;
        this.head.active = false;
        this.content.removeAllChildren();
        this.node.active = this.flag;
    },



    // update (dt) {},
});
