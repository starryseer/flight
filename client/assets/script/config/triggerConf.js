const triggerConf = function(){
    let that = {};
    //"frame"弹框预制体图  "other"触发其他道具变化 null无其他触发  "framePos"位置   "scene" 功能跳转页面   "framePrefab"   预制体名称    "otherName"触发其他道具名称
    that[0] = {"frame":0,"other":0,"framePos":{"x":10,"y":30},"scene":"miniMain","framePrefab":"computerPlay","otherName":"computerBox2"};
    return that;
};
export default triggerConf;