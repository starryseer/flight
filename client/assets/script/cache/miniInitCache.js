const miniInitCache = function(){
    let that = {};
    that.nickname = null;

    that.setNickname = function(nickname)
    {
        that.nickname = nickname;
    };

    that.getNickname = function()
    {
        return that.nickname;
    };

    
    return that;
};
export default miniInitCache;