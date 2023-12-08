const db = require("../../../DB/DB");

module.exports = function() {
    let operations = {
        GET,
    }

    async function GET(req,res,next){
        const gameData = await db.readGames();
        res.status(200).json(gameData);
    }

    GET.apiDoc = {
        summary: "Gets all game information",
        description: "Retrieve all game information that exist and return game array",
        operationId: "get-games",
        responses: {
            200: {
                description: "OK",
                content: {
                    "application/json": {
                        schema: {
                            type: "array",
                            items: {
                                $ref: '#/components/schemas/games'
                            }
                        }
                    }
                }
            }
        }
    }

    
    return operations;
}