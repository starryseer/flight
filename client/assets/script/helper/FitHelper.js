const FitHelper = function(){
    let that = {};
    that.fitFun = (target)=>{
        // 1. 先找到 SHOW_ALL 模式适配之后，本节点的实际宽高以及初始缩放值
        let srcScaleForShowAll = Math.min(cc.view.getCanvasSize().width / target.width, cc.view.getCanvasSize().height / target.height);
        let realWidth = target.width * srcScaleForShowAll;
        let realHeight = target.height * srcScaleForShowAll;

        // 2. 基于第一步的数据，再做缩放适配
        var ratio = Math.max(cc.view.getCanvasSize().width / realWidth, cc.view.getCanvasSize().height / realHeight);
        target.scale = ratio;
        return ratio;
    };
    that.onEnable= function (target) {
        target.on('touchstart',  (event)=> {
            event.stopPropagation();
        });
        target.on('touchend', (event)=> {
            event.stopPropagation();
        });
    };
    that.onDisable= function () {
        this.node.off('touchstart',  (event) =>{
            event.stopPropagation();
        });
        this.node.off('touchend', (event) => {
            event.stopPropagation();
        });
    };

    return that;
};
export default FitHelper;