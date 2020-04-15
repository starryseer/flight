import global from "./../global/global"
cc.Class({
    extends: cc.Component,

    properties: {
        bg: {
            default: null,
            type: cc.Node,
            tooltip: '背景'
        },
        account:{
            default: null,
            type: cc.EditBox,
            tooltip: '背景'
        },  // 账号
        password: {
            default: null,
            type: cc.EditBox,
            tooltip: '背景'
        }, // 密码
        start_btn: {
            default: null,
            type: cc.Node,
            tooltip: '背景'
        },  // 开始按钮
    },

    onLoad () {
        global.FitHelper.fitFun(this.bg);
    },

    start () {

    },

    startClick () {
        var account = this.account.string;
        var password = this.password.string;
        var param = {account:account,password: password ,deviceType: 'ios', plat: 10, udid: 123};
        this.loginSDK(param);
    },

    loginSDK(param)
    {
        global.HttpHelper.httpPost(global.urlConf.sdk_login,param,(rsp)=>{
            if(rsp == -1)
            {
                return;
            }

            if(rsp.code == 200)
            {
                global.userData.initUserData(rsp.data.user);
                this.loginGame();
            }
            else
            {
                return;
            }
        });
    },



    loginGame(){
        var param = {userId:global.userData.id,token:global.userData.token};
        global.HttpHelper.httpPost(global.urlConf.game_login,param,(rsp)=>{
            if(rsp == -1)
            {
                return;
            }

            if(rsp.code == 200)
            {
                global.clientData.initClientData(rsp.data.client);
                global.clientAttrData.initClientAttrData(rsp.data.clientAttr);
                global.itemData.initItemData(rsp.data.item);
                global.miniGameData.initMiniGameData(rsp.data.miniGame);
                cc.director.loadScene('home');
            }
            else
            {
                return;
            }
        });
        
    },

    update (dt) {},
});
