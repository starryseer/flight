import global from './../../global/global';
cc.Class({
    extends: cc.Component,

    properties: {
        infoBg: {
            default: null,
            type: cc.Node,
            tooltip: '个人信息'
        }, 
        currentTime: {
            default: 0,
            type: cc.Integer,
            tooltip: '当前事件'
        }, 
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on(cc.Node.EventType.TOUCH_START,this.onTouchStart,this);
        this.node.on(cc.Node.EventType.TOUCH_END,this.onTouchEnd,this);
    },

    start () {
        global.FitHelper.onEnable(this.infoBg);
        this.infoBg.active = false;
        this.infoBg.on(cc.Node.EventType.TOUCH_START,this.fade,this);
        if (this.node._touchListener) {
            this.node._touchListener.setSwallowTouches(false);
        }
    },

    onTouchStart(){
        this.currentTime = Date.now();
        //通过系统事件触发自定义锁，防止点击角色移动
        cc.systemEvent.emit('playerLock',{});
        this.scheduleOnce(()=>{
            cc.systemEvent.emit('playerUnLock',{});
        },0.2);
    },

    onTouchEnd(){
        if((Date.now() - this.currentTime) < 200)
        {
            this.infoBg.active = true;
            this.infoBg.emit('init',{});
        }
    },

    fade()
    {
        this.infoBg.active = false;
    },

    onBagClick(target,data){
        cc.systemEvent.emit('bagShow',{});
        this.infoBg.active = false;
    },

    // update (dt) {},
});
