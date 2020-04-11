cc.Class({
    extends: cc.Component,

    properties: {
       
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    onFrameClick(target,data){
        cc.director.loadScene('jumpBall');
    }

    // update (dt) {},
});
