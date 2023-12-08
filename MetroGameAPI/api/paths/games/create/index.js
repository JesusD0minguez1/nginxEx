const db = require("../../../../DB/DB");

module.exports = function() {
    let operations = {
        POST,
    }

    function POST(req,res,next){
        let newGame = {
            gameID: req.body.gameID,
            gameName : req.body.gameName,
            publisher : req.body.publisher,
            releaseDate: req.body.releaseDate,
            deviceCompatability: req.body.deviceCompatability,
            condition: req.body.condition,
            preownedHistory: req.body.preownedHistory
        };
        db.createGame(newGame)
        console.log(`you have successfully inserted: ${newGame}`);
        const gameData = db.readGames
        res.status(201).json(gameData);

    }

    POST.apiDoc = {
        summary: "Creates a new game",
        description: "Creates a new game based on parameters",
        operationId: "post-game",
        responses: {
            201: {
                description: "Create",
                content: {
                    "application/json":{
                        "schema": {
                            $ref: "#/components/schemas/game"
                        }
                    }
                }
            }
        }
    }

    return operations;
}