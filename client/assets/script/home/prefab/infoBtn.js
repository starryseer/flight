import global from './../../global/global';
cc.Class({
    extends: cc.Component,

    properties: {
        infoLabel:{
            default: null,
            type: cc.Label,
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
                type = '烹饪';
                break;
            case 'use':
                type = '使用';
                break;    
            case 'sale':
                type = '转卖';
                break;   
            case 'eat':
                type = '食用';
                break;         
        }
        this.infoLabel.string = type;
        this.id = data['id'];
        this.btnType = data['type'];
    },

    onButtonClick(){
        cc.systemEvent.emit('showDealFrame',{id:this.id,type:this.btnType});
        this.node.parent.parent.parent.destroy();
    }

    // update (dt) {},
});
