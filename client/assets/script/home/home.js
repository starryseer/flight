import global from "../global/global";

cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.loadConfig();
        this.initCollision();
        this.initPhysics();
    },

    loadConfig(){
        cc.loader.loadResDir("config", (err, dir)=> {
            if(err)
                return;
            for(let i=0;i<dir.length;i++)
            {
                cc.loader.loadRes('config/' + dir[i].name.trim() + '.json',(error,json)=>{
                    global.configConf[json.name] = json.json;
                });
            } 
        }); 
    },

    initCollision(){
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
    },

    initPhysics(){
        var manager = cc.director.getPhysicsManager();
        manager.enabled = true;
        manager.gravity = cc.v2(0,0);
        // manager.enabledDebugDraw = true;
    },
    

    // update (dt) {},
});
