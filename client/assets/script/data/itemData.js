const itemData = function(){
    let that = {};
    that.items = {};
    that.initItemData = function(items)
    {
        that.items = {};
        for(var index in items)
        {
            that.items[items[index]['id']] = items[index];
        }
    };
    return that;
};
export default itemData;