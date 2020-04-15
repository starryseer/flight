import global from './../../global/global'
cc.Class({
    extends: cc.Component,

    properties: {
        headBoxLab: {
            default: null,
            type: cc.Label,
            tooltip: '文本框'
        },
        headBoxBg: {
            default: null,
            type: cc.Node,
            tooltip: '文本框背景'
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

    },

    editBegin(target,data)
    {
        this.headBoxBg.active = false;
    },

    editChange(target,data)
    {
        global.miniInitCache.setNickname(this.headBoxLab.string);
    },

    editEnd(target,data)
    {
        if(this.headBoxLab.string)
        {
            this.headBoxBg.active = false;
        }
        else
        {
            this.headBoxBg.active = true;       
        }
    },

    onButtonClick(target,data)
    {
        if(!this.headBoxLab.string)
            return;

        cc.systemEvent.emit('miniInit',1);
    }

    // update (dt) {},
});
