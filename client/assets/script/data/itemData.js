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

    that.update = function(items)
    {
        if(items.length != 0)
        {
            for(var index in items)
            {
                if(items[index]['num'] == 0)
                    delete that.items[items[index]['id']];
                else
                    that.items[items[index]['id']] = items[index];
            }
        }
    };

    return that;
};
export default itemData;