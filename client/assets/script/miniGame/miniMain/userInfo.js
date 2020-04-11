import global from "./../../global/global";
cc.Class({
    extends: cc.Component,

    properties: {
        nicknameLab: {
            default: null,
            type: cc.Label,
            tooltip: '昵称标签'
        },
        signatureLab: {
            default: null,
            type: cc.Label,
            tooltip: '签名标签'
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on('init',(data)=>{
            this.nicknameLab.string = global.clientAttrData.nickname?global.clientAttrData.nickname:"";
            this.signatureLab.string = global.clientAttrData.signature?global.clientAttrData.signature:"";
        });
    },

    onModifyClick(target,data)
    {
        
    },

    // update (dt) {},
});
