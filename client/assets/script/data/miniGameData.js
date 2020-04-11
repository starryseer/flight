const miniGameData = function(){
    let that = {};
    that.miniGame = {};

    that.initMiniGameData = function(miniGames)
    {
        for(var index in miniGames)
        {
            that.miniGame[miniGames[index]['gameId']] = miniGames[index];
        }
    };

    that.playData = function(miniGame)
    {
        that.miniGame[miniGame['gameId']] = miniGame;
    };

    return that;
};
export default miniGameData;