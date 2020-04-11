import userData from './../data/userData';
import clientData from './../data/clientData';
import clientAttrData from './../data/clientAttrData';
import miniGameData from './../data/miniGameData';
import itemData from './../data/itemData';
import urlConf from './../config/urlConf';
import triggerConf from './../config/triggerConf';
import HttpHelper from './../helper/HttpHelper';
import FitHelper from './../helper/FitHelper';
const global = {} || global;

global.userData = userData();
global.clientData = clientData();
global.clientAttrData = clientAttrData();
global.itemData = itemData();
global.miniGameData = miniGameData();
global.urlConf = urlConf();
global.triggerConf = triggerConf();
global.HttpHelper = HttpHelper;
global.FitHelper = FitHelper();
export default global;