const userData = function(){
    let that = {};
    that.id = null;
    that.token = null;

    that.initUserData = function(user)
    {
        that.id = user.id;
        that.token = user.token;
    };

    return that;
};
export default userData;