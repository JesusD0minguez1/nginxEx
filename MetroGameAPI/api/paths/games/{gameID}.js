const db = require("../../../DB/DB");

module.exports = function() {
    let operations = {
        PUT,
        DELETE,
    }
    
    async function PUT(req,res,next){
        let gameID = req.params.gameID;
        let newGameID = Number(gameID)

        let updatedGame = {
            gameName : req.body.gameName,
            publisher : req.body.publisher,
            releaseDate: req.body.releaseDate,
            deviceCompatability: req.body.deviceCompatability,
            condition: req.body.condition,
            preownedHistory: req.body.preownedHistory
        }
        const updateGame = await db.updateGame(newGameID,updatedGame);
        const gameData = await db.readGames();
        res.status(204).json(gameData);
    }

    async function DELETE(req,res,next){
        let gameID = req.params.gameID;
        let newGameID = Number(gameID)
        console.log(gameID);
        
        const deleted = await db.deleteGame(newGameID);
        const gameData = await db.readGames();
        res.status(200).json(gameData);
    }

    PUT.apiDoc = {
        summary: "Updates a game",
        description: "Updates a game based on parameters",
        operationId: "put-game",
        responses: {
            204: {
                description: "Updated",
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

    DELETE.apiDoc = {
        summary: "Deletes a game",
        description: "Deletes a game based on parameters",
        operationId: "delete-game",
        responses: {
            202: {
                description: "Accepted",
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