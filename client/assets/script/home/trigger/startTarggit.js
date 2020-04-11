cc.Class({
    extends: cc.Component,

    properties: {
        loadScene: {
            default: null,
            displayName: 'LoadScene',
            tooltip: '跳转场景',
        },
    },

    onLoad () {
        this.node.on('updateScene',(scene)=>{
            this.loadScene = scene;
        });   
    },

    onButtonClick(target,data){
        if(this.loadScene == null)
            return;

        cc.director.loadScene(this.loadScene);
    },
});
