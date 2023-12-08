const db = require("../../../DB/DB");
const {produceUserMessage} = require("../../../streams/kafka.js")


module.exports = function() {
    let operations = {
        PUT,
    }

    async function PUT(req,res,next){
        let userID = req.params.userID;
        let newUserID = Number(userID)

        let updatedUser = {
            name: req.body.name,
            email: req.body.email,
            address: {
                state: req.body.state,
                city: req.body.city,
                zipcode: req.body.zipcode
            },
            password: req.body.password
        }

        const newlyUpdatedUser = await db.updateUser(newUserID,updatedUser)
        const userUpdatedToStream = await produceUserMessage("updated-user", updatedUser)
        const userData = await db.readUsers()
        res.status(204).json(userData);
    }
    
    PUT.apiDoc = {
        summary: "updates a user",
        description: "updates a user with appropiate resources",
        operationId: "put-users",
        responses: {
            204: {
                description: "Updated",
                content: {
                    "application/json":{
                        "schema": {
                            $ref: "#/components/schemas/user"
                        }
                    }
                }
            }
        }
    }
    return operations;
}