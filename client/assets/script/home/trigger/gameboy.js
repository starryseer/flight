cc.Class({
    extends: cc.Component,

    properties: {
        light: {
            default: null,
            type: cc.Node,
            tooltip: '屏幕亮暗'
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.light.active = false;
        this.node.on('trigger',(flag)=>{
            if(flag)
            {
                this.light.active = true;
            }
            else
            {
                this.light.active = false;
            }
        });
    },

    start () {

    },

    // update (dt) {},
});
