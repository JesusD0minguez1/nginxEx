const db = require("../../../../DB/DB");
const {produceUserMessage} = require("../../../../streams/kafka.js")


module.exports = function() {
    let operations = {
        POST,
    }

    async function POST(req,res,next){
        
        let newUser = {
            userID: req.body.userID,
            name : req.body.name,
            email : req.body.email,
            address : {
                state: req.body.state,
                city: req.body.city,
                zipcode: req.body.zipcode
            }
        }
        db.createUser(newUser);
        const userCreatedToStream = await produceUserMessage("created-user", newUser)
        console.log(`you have successfully inserted: ${newUser}`);
        const updatedUsers = await db.readUsers()
        console.log("users: ", updatedUsers)
        res.status(201).json(updatedUsers);
    }
    
    POST.apiDoc = {
        summary: "Creates a new user",
        description: "Creates a new user based on parameters",
        operationId: "post-user",
        responses: {
            201: {
                description: "Created",
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