const clientData = function(){
    let that = {};
    that.create_channel = null;
    that.login_account = null;
    that.status = null;
    that.user_id = null;

    that.initClientData = function(client)
    {
        that.create_channel = client.create_channel;
        that.login_account  = client.login_account;
        that.status         = client.status;
        that.user_id        = client.user_id;
    };

    return that;
};
export default clientData;