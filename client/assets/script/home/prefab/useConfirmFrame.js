import global from "./../../global/global";
cc.Class({
    extends: cc.Component,

    properties: {
        gainLab: {
            default: null,
            type: cc.Label,
            tooltip: '标签'
        }, 
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on('init',this.init,this);
    },

    start () {

    },

    init(data){
        this.gainLab.string = '';
        var string = '';
        for(var key in data['show'])
        {
            var keyNow = key + "";
            switch(keyNow)
            {
                case '0':
                    string = "疲劳 ✖"+data['show'][key]['num'] + "\n";
                    break;
                case '1':
                    string = "金币 ✖"+data['show'][key]['num'] + "\n";
                    break;  
                case '2':
                    string = "钻石 ✖"+data['show'][key]['num'] + "\n";
                    break;    
                default:
                    string = global.configConf['item'][keyNow]['name']+ "✖" + data['show'][key]['num'] + "\n";
            }
            this.gainLab.string+= string;
        }
    },

    onButtonClick(target,data){
        this.node.destroy();
    },

    // update (dt) {},
});
