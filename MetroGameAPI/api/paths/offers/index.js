const db = require("../../../DB/DB");

module.exports = function() {
    let operations = {
        GET,
    }

    async function GET(req,res,next){
        const offerData = await db.readOffers();
        res.status(200).json(offerData);
    }

    GET.apiDoc = {
        summary: "Gets all offer information",
        description: "Retrieve all offer information that exist and return offers array",
        operationId: "get-offers",
        responses: {
            200: {
                description: "OK",
                content: {
                    "application/json": {
                        schema: {
                            type: "array",
                            items: {
                                $ref: '#/components/schemas/offers'
                            }
                        }
                    }
                }
            }
        }
    }

    return operations;
}