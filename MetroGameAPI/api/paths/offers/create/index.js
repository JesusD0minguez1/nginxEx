const db = require("../../../../DB/DB");
const {produceOfferMessage} = require("../../../../streams/kafka.js")



module.exports = function() {
    let operations = {
        POST,
    }

    async function POST(req,res,next){
        let newOffer = {
            offerID: req.body.offerID,
            offeror: req.body.offeror,
            trade: {
                offeredTrade: req.body.offeredTrade,
                expectedTrade: req.body.expectedTrade
            },
            recipient: req.body.recipient,
            date: req.body.date,
            status: req.body.status
        }
        const offerCreatedToStream = await produceOfferMessage("created-offer", newOffer);
        db.createOffer(newOffer);
        const offerData = db.readOffers
        res.status(201).json(offerData);
    }

    POST.apiDoc = {
        summary: "Creates a new offer",
        description: "Creates a new offer based on parameters",
        operationId: "post-offer",
        responses: {
            201: {
                description: "Created",
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