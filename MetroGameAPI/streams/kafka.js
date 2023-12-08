const { Kafka } = require('kafkajs');

const brokerAddress = "broker:29092";
const offersTopic = "offers"
const usersTopic = "users"

const kafka = new Kafka({   // We made a kafka client here, but didn't tell how to connect
    brokers: [brokerAddress],
    clientId: "metrogames-api-producer",
})

const producer = kafka.producer();

exports.produceOfferMessage = async(offerEvent, offer) =>{
    console.log(offersTopic);
    const connect = await producer.connect();
    const producerData = await producer.send({
        topic: offersTopic,
        messages: [{
            key: offerEvent,
            value: JSON.stringify(offer)
        }]
    })
}

exports.produceUserMessage = async(userEvent, user) =>{
    console.log(usersTopic);
    const connect = await producer.connect();
    const producerData = await producer.send({
        topic: usersTopic,
        messages: [
            {
                key: userEvent,
                value: JSON.stringify(user)
            }
        ]
    })
}

//export =  {produceOfferMessage, produceUpdateOfferMessage, produceUserMessage}
