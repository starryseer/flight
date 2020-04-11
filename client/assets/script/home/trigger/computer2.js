cc.Class({
    extends: cc.Component,

    properties: {
        Frame: {
            default: [],
            type: cc.SpriteFrame,
            tooltip: '电脑屏幕开关图片'
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on('trigger',(flag)=>{
            if(flag)
            {
                this.node.getComponent(cc.Sprite).spriteFrame = this.Frame[0]
            }
            else
            {
                this.node.getComponent(cc.Sprite).spriteFrame = this.Frame[1]
            }
        });
    },

    start () {

    },

    // update (dt) {},
});
