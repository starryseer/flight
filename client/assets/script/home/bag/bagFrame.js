cc.Class({
    extends: cc.Component,

    properties: {
        matter: {
            default: null,
            type: cc.Node,
            tooltip: '食材框'
        }, 
        food: {
            default: null,
            type: cc.Node,
            tooltip: '食物框'
        }, 
        item: {
            default: null,
            type: cc.Node,
            tooltip: '道具框'
        }, 
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

    },

    start () {
        this.node.on('init',this.init,this);
        this.init();
    },

    init(){
        this.matter.emit('fade',{});
        this.food.emit('fade',{});
        this.item.emit('fade',{});
    },

    onButtonClick(target,data){
        switch(parseInt(data)){
            case 1:
                this.matter.emit('btnTouch',{});
                this.food.emit('fade',{});
                this.item.emit('fade',{});
                break;
            case 2:
                this.matter.emit('fade',{});
                this.food.emit('btnTouch',{});
                this.item.emit('fade',{});
                break; 
            case 3:
                this.matter.emit('fade',{});
                this.food.emit('fade',{});
                this.item.emit('btnTouch',{});
                break;          
        }
    },

    



    // update (dt) {},
});
