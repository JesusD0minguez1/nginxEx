const { Kafka } = require('kafkajs');

const brokerAddress = "broker:29092";

const kafka = new Kafka({   // We made a kafka client here, but didn't tell how to connect
    brokers: [brokerAddress],
    clientId: "email-consumer",
})



const consumer = kafka.consumer({groupId: "email-consumer"})

const initializeOfferConsumer = async() =>{

}

exports.startOffersConsumer = async(handler) => {
    await consumer.connect();
    await consumer.subscribe({topics:["offers", "users"]});
    console.log("Starting consuming --------")
    consumer.run({
        eachMessage: async({topic, partition, message, heartbeat, pause}) => handler(message)
    })
    return consumer;

}

//export =  {produceOfferMessage, produceUpdateOfferMessage, produceUserMessage}
