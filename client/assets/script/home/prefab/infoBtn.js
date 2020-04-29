import global from './../../global/global';
cc.Class({
    extends: cc.Component,

    properties: {
        cook:{
            default: null,
            type: cc.Node,
            tooltip: '标签'
        },
        eat:{
            default: null,
            type: cc.Node,
            tooltip: '标签'
        },
        sale:{
            default: null,
            type: cc.Node,
            tooltip: '标签'
        },
        use:{
            default: null,
            type: cc.Node,
            tooltip: '标签'
        },
        id:{
            default: 0,
            type: cc.Integer,
            tooltip: 'id'
        },
        btnType:{
            default: '',
            tooltip: '按键类型'
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on('init',this.init,this);
    },

    start () {

    },

    init(data){
        var type = '';
        switch(data['type']){
            case 'cook':
                this.eat.active = false;
                this.sale.active = false;
                this.use.active = false;
                break;
            case 'use':
                this.cook.active = false;
                this.eat.active = false;
                this.sale.active = false;
                break;    
            case 'sale':
                this.cook.active = false;
                this.eat.active = false;
                this.use.active = false;
                break;   
            case 'eat':
                this.cook.active = false;
                this.sale.active = false;
                this.use.active = false;
                break;         
        }
        this.id = data['id'];
        this.btnType = data['type'];
    },

    onButtonClick(){
        cc.systemEvent.emit('showDealFrame',{id:this.id,type:this.btnType});
        this.node.parent.parent.parent.destroy();
    }

    // update (dt) {},
});
