const db = require("../../../DB/DB");
const {produceOfferMessage} = require("../../../streams/kafka.js")


module.exports = function() {
    let operations = {
        PATCH,
        DELETE,
    }
    
    async function PATCH(req,res,next){
        let offerID = req.params.offerID;
        let newOfferID = Number(offerID);

        let newOffer = {
            offeror: req.body.offeror,
            trade: {
                offeredTrade: req.body.offeredTrade,
                expectedTrade: req.body.expectedTrade
            },
            recipient: req.body.recipient,
            date: req.body.date,
            status: req.body.status
        }

        console.log(newOffer)

        const updateOffers = await db.updateOffer(newOfferID,newOffer);
        const offerUpdatedToStream = await produceOfferMessage("updated-offer", newOffer);
        const offerData = await db.readOffers();
        res.status(204).json(offerData);
    }

    async function DELETE(req,res,next){
        const offerID = req.params.offerID
        const newOfferID = Number(offerID)
        const deleted = db.deleteOffer(newOfferID);
        const offerData = await db.readOffers();
        res.status(200).json(offerData);
    }

    PATCH.apiDoc = {
        summary: "Updates an offer",
        description: "updates an offer based on parameters",
        operationId: "patch-offer",
        responses: {
            204: {
                description: "Updated",
                content: {
                    "application/json":{
                        "schema": {
                            $ref: "#/components/schemas/offer"
                        }
                    }
                }
            }
        }
    }

    DELETE.apiDoc = {
        summary: "Deletes an offer",
        description: "Deletes an offer based on parameters",
        operationId: "delete-offer",
        responses: {
            200: {
                description: "OK",
                content: {
                    "application/json":{
                        "schema": {
                            $ref: "#/components/schemas/offer"
                        }
                    }
                }
            }
        }
    }

    return operations;
}