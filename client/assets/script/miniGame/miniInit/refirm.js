import global from './../../global/global'
cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    onButtonClick(target,data)
    {
        if(!global.miniInitCache.getNickname())
        {
            cc.systemEvent.emit('miniInit',0);
        }

        var param = {
            'userId':global.userData.id,
            'token':global.userData.token,
            'nickname':global.miniInitCache.getNickname(),
        };

        cc.log(param);

        global.HttpHelper.httpPost(global.urlConf.set_nickname,param,(rsp)=>{
            if(rsp == -1)
            {
                return;
            }

            if(rsp.code == 200)
            {
                global.clientAttrData.initClientAttrData(rsp.data.clientAttr);
                cc.director.loadScene('miniMain');
            }
            else
            {
                return;
            }
        });
    },

    // update (dt) {},
});
