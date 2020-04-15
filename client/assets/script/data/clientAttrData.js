const clientAttrData = function(){
    let that = {};
    that.client_id = null;
    that.diamond = null;
    that.fatigue = null;
    that.gold = null;
    that.mood = null;
    that.nickname = null;
    that.signature = null;
    that.avatar = null;


    that.initClientAttrData = function(clientAttr)
    {
        that.client_id = clientAttr.client_id;
        that.diamond = clientAttr.diamond;
        that.fatigue = clientAttr.fatigue;
        that.gold = clientAttr.gold;
        that.mood = clientAttr.mood;
        that.nickname = clientAttr.nickname;
        that.signature = clientAttr.signature;
        that.avatar = clientAttr.avatar;
    };

    
    return that;
};
export default clientAttrData;