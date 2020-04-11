
cc.Class({
    extends: cc.Component,

    properties: {
        player: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    update (dt) {
        this.node.x = this.player.x;
    },
});
