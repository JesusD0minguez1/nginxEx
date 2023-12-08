const db = require("../../../DB/DB");

module.exports = function() {
    let operations = {
        GET,
    }

    async function GET(req,res,next){
        let userData = await db.readUsers();
        res.status(200).json(userData);
    }

    GET.apiDoc = {
        summary: "Gets all user information",
        description: "Retrieve all user information that exist and return users array",
        operationId: "get-users",
        responses: {
            200: {
                description: "OK",
                content: {
                    "application/json": {
                        schema: {
                            type: "array",
                            items: {
                                $ref: '#/components/schemas/users'
                            }
                        }
                    }
                }
            }
        }
    }
    return operations;
}