import global from "./../../global/global"
cc.Class({
    extends: cc.Component,

    properties: {
        bg: {
            default: null,
            type: cc.Node,
            tooltip: '背景'
        },
        ball: {
            default: null,
            type: cc.Node,
            tooltip: '小球'
        },
        tipFrame: {
            default: null,
            type: cc.Node,
            tooltip: '提示框'
        },
        blockPrefab: {
            default: null,
            type: cc.Prefab,
            tooltip: '板'
        },
        blockParent: {
            default: null,
            type: cc.Node,
            tooltip: '背景'
        },
        score: {
            default: null,
            type: cc.Label,
            tooltip: '分数'
        },
        tag: {
            default: 0,
            type: cc.Integer,
            tooltip: '标签'
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.score.string = 0;
        this.gameStart = 0;
        this.blockSpeed = 350;
        this.blockList = [];
        this.lastPos = null;

        global.FitHelper.fitFun(this.bg);
        this.initPhysics();
        this.initBlock();
        this.node.on('touchstart',this.acc,this);
        cc.systemEvent.on('collider',this.collider,this);
    },

    onDestroy(){
        this.node.off('touchstart',this.acc,this);
        cc.systemEvent.off('collider',this.collider,this);
    },

    initPhysics:function(){
        var manager = cc.director.getPhysicsManager();
        manager.enabled = true;
        manager.gravity = cc.v2(0,-2400);
            
    },

    initBlock()
    {
        this.lastPos = cc.v2(this.ball.x,0);
        var block = null;
        for(var i = 0;i<6;i++)
        {
            block = cc.instantiate(this.blockPrefab);
            block.parent = this.blockParent;
            block.setPosition(this.lastPos);
            this.blockList.push(block);
            this.lastPos.x+=280;
        } 
    },

    acc(){
        if(this.ball.getComponent('ball').initSpeed)
        {
            var rigidBody = this.ball.getComponent(cc.RigidBody);
            rigidBody.linearVelocity = cc.v2(0,-1200);
            if(this.gameStart == 0)
                this.gameStart = 1;
        }
    },

    collider(){
        if(this.gameStart)
        {
            this.score.string = parseInt(this.score.string)+1;
            this.blockSpeed+=5;
            this.gameStart = 2;
        }

    },

    getLastPos(){
        var pos = 0;
        for(var block of this.blockList)
        {
            if(block.x > pos)
                pos = block.x;
        }
        return pos;
    },

    update (dt) {
        if(this.gameStart >1)
        {
            for(var block of this.blockList)
            {
                block.x+= (-1)*this.blockSpeed*dt;
                if(block.x < ((-1)*cc.winSize.width/2 -280))
                {
                    block.x = this.getLastPos() + 280;
                    block.emit('init',{});
                }
            }
        }

        if(this.ball.y <-200 && !this.tag)
        {
            this.tag = 1;
            var max = global.HttpHelper.httpPost(global.urlConf.mini_play, {userId:global.userData.id,token:global.userData.token,gameId:1,point:this.score.string},
                (rsp)=>{
                    if(rsp == -1)
                    {
                        return;
                    }

                    if(rsp.code == 200)
                    {
                        global.clientAttrData.initClientAttrData(rsp.data.clientAttr);
                        global.miniGameData.playData(rsp.data.miniGame);
                        this.tipFrame.emit('show',{now:this.score.string,max:global.miniGameData.miniGame[1]['point']});
                    }
                    else
                    {
                        return;
                    }
                });
            
        }
 

    },
});
