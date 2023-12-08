const {MongoClient} = require("mongodb");

const mongo = process.env.host;

//const uri = "mongodb://localhost:2717";
const uri = `mongodb://${mongo}`
//const  uri = "mongodb+srv://user:pass@csc380cluster.vnaed9u.mongodb.net/test"
const client = new MongoClient(uri);
const dbName = "RetroGames";
const db = client.db(dbName);
const users = db.collection("users");
const games = db.collection("games");
const offers = db.collection("offers");

const defaultUsers = [
    {
        userID: 1,
        name: "Joseph",
        email: "Joseph@gmail.com",
        address: {
            state: "Utah",
            city: "Salt Lake City",
            zipcode: "11111"
        },
        password: "password123"

    },
    {
        userID: 2,
        name: "Jesus",
        email: "Jesus@gmail.com",
        address: {
            state: "Utah",
            city: "Salt Lake City",
            zipcode: "11111"
        },
        password: "ThisIsMyPass"
    },
];
const defaultOffer = {
    offerID: 1,
    offeror: "Eric",
    trade: {
        offeredTrade: ["RetroGames/games/gameID/1"],
        expectedTrade: ["RetroGame/games/gameID/2"]
    },
    recipient: ["Jesus"],
    date: "1/25/2023",
    status: "pending"
};
const defaultGames = [
    {
        gameID: 1,
        gameName: "Fortnite",
        publisher: "Epic Games",
        releaseDate: "01/01/2017",
        deviceCompatability: "All platforms",
        condition: "good",
        preownedHistory: [
            "Jesus", "Eric"
        ]
    },
    {
        gameID: 2,
        gameName: "GTAV",
        publisher: "RockStar Games",
        releaseDate: "03/02/2013",
        deviceCompatability: "All platforms",
        condition: "Mint",
        preownedHistory: ["Eric"]
    },
];

async function main(){
    try{
        await client.connect();

        //Only populates collection if collection is empty

        const userResult = await users.find({}).toArray();
        const gameResult = await games.find({}).toArray();
        const offerResult = await offers.find({}).toArray();

        if(userResult.length <= 1 && gameResult.length <= 1 && offerResult.length <= 1){
            const userData = await users.insertMany(defaultUsers);
            const gameData = await games.insertMany(defaultGames);
            const offerData = await offers.insertOne(defaultOffer);
            console.log("RetroGames database and collections have been populated");
        }else{
            console.log("Collection are up and ready!");
        }
        
    }catch(exception){ console.error(exception); }
    finally{ await client.close();}
}

//Gets all user data
const readUsers = async() => {
    try {
    await client.connect();
    const result = await users.find().toArray();
    console.log(result);
    return result;
    } finally {
        client.close();
    }
}

//Creates an user object in DB
const createUser = async(newUser) =>{
    await client.connect();
    const action = await users.insertOne(newUser);
    console.log(`Created User in database`);
    client.close();
}

//Updates an user based on userID
const updateUser = async(userid, newData ) =>{ 
    try{
        await client.connect();
        var updateQuery = {userID: userid }
        var newValues = {$set : newData}
        const action = await users.updateOne(updateQuery,newValues);
        console.log(`updated User in database`);
    }finally{
        client.close();
    }
}

//Gets all game data
const readGames = async() => {
    try {
        await client.connect();
        const result = await games.find().toArray();
        
        console.log(result);
        return result;
        } finally {
            client.close();
        }
}

//Creates an game object in DB
const createGame = async(newGame) =>{
    await client.connect();
    const action = await games.insertOne(newGame);
    console.log(`Created game in database`);
    client.close();
}

//Updates a game based on gameID
const updateGame = async(gameid, newData) =>{
    try{
        await client.connect();
        var updateQuery = {gameID: gameid }
        var newValues = {$set : newData}

        const action = await games.updateOne(updateQuery,newValues);
        console.log(`updated game in database`);
    }finally{
        client.close();
    }
}

//Deletes game from DB based on gameID
const deleteGame = async(gameId) =>{
    await client.connect();
    var deleteQuery = {gameID:gameId}
    const action = await games.deleteOne(deleteQuery);
    console.log(`deleted game in database`);
    client.close();
}

//Gets all offer data
const readOffers = async() => {
    try {
        await client.connect();
        const result = await offers.find().toArray();
        console.log(result);
        return result;
        } finally {
            client.close();
        }
}

//Creates an offer object in DB
const createOffer = async(newOffer) =>{
    await client.connect();
    const action = await offers.insertOne(newOffer);
    console.log(`Created offer in database`);
    client.close();
}

//Updates an offer based on offerID
const updateOffer = async(offerid, newData) =>{
    try{
        await client.connect()
        var updateQuery = {offerID: offerid }
        var newValues = {$set : newData}

        const action = await offers.updateOne(updateQuery, newValues);
        console.log(`updated offer in database`);
    }finally{
        client.close();
    }
}

//Deletes offer from DB based on offerID
const deleteOffer = async(offerID) =>{
    await client.connect();
    var deleteQuery = {offerID: offerID}
    const action = await offers.deleteOne(deleteQuery);
    console.log(`deleted offer in database`);
    client.close();
}

//Connects to MongoDB and populates database with default data set

main();

module.exports = {
    readUsers,
    createUser,
    updateUser,
    readGames,
    createGame,
    updateGame,
    deleteGame,
    readOffers,
    createOffer,
    updateOffer,
    deleteOffer,
}