const apiDoc={
    openapi: "3.0.1",
    info: {
        title: "MetroGames",
        description: "This API provides information pertain to users, game status, game information",
        version: "1.0.0"
    },
    paths: {},
    components: {
        parameters: {
            userID: {
                name: "userID",
                in: "path",
                schema: {
                    $ref: "#/components/schemas/userID"
                }
            },
            offerID: {
                name: "offerID",
                in: "path",
                schema: {
                    $ref: "#/components/schemas/offerID"
                }
            },
            gameID: {
                name: "gameID",
                in: "path",
                schema: {
                    $ref: "#/components/schemas/gameID"
                }
            }
        },
        schemas: {
            gameID: {
                type: "integer"
            },
            userID: {
                type: "integer"
            },
            offerID: {
                type: "integer"
            },
            users: {
                type: "array"
            },
            address: {
                type: "object",
                properties: {
                    state: {
                        title: "state",
                        type: "string"
                    },
                    city: {
                        title: "state",
                        type: "string"
                    },
                    zipcode: {
                        title: "zipcode",
                        type: "integer",
                        maxLength: 23
                    }
                }
            },
            trade: {
                type: "object",
                properties: {
                    offeredTrade: {
                        title: "offeredTrade",
                        type: "array",
                        description: "a list of game(s) that are willing to be traded in exchange for goods"
                    },
                    expectedTrade: {
                        title: "expectedTrade",
                        type: "array",
                        description: "Expected list of game(s)/goods that will be exchanged during trade"
                    },
                }
            },
            user: {
                type: "object",
                properties: {
                    userID: {
                        $ref: "#/components/schemas/userID"
                    },
                    name: {
                        title: "name",
                        type: "string",
                        maxLength: 25
                    },
                    email: {
                        title: "email",
                        type: "string",
                        maxLength: 50
                    },
                    address: {
                        $ref: "#/components/schemas/address"
                    },
                    password: {
                        title: "password",
                        type: "string",
                        description: "user's credential"
                    }

                }
            },
            games:{
                type: "array"
            },
            game: {
                type: "object",
                properties: {
                    gameID: {
                        $ref: "#/components/schemas/gameID"
                    },
                    gameName: {
                        title: "gameName",
                        type: "string",
                        maxLength: 25
                    },
                    publisher: {
                        title: "publisher",
                        type: "string"
                    },
                    releaseDate: {
                        title: "releaseDate",
                        type: "string",
                        format: 'date'
                    },
                    deviceCompatability: {
                        title: "deviceCompatability",
                        type: "string"
                    },
                    condition: {
                        title: "condition",
                        type: "string"
                    },
                    preownedHistory: {
                        title: "pre-ownedHistory",
                        type: "array"
                    }
                }
            },
            offers:{
                type: "array"
            },
            offer: {
                type: "object",
                properties: {
                    offerID: {
                        $ref: "#/components/schemas/offerID"
                    },
                    offeror: {
                        title: "offeror",
                        type: "string",
                        description: "user giving the offer"
                    },
                    trade: {
                        $ref: "#/components/schemas/trade"
                    },
                    recipient: {
                        title: "recipient",
                        type: "array",
                        description: "user(s) being offered the trade"
                    },
                    date: {
                        title: "date",
                        type: "string",
                        format: "date-time",
                    },
                    status:{
                        title: "status",
                        type: "string",
                        maxLength: 9
                    }
                    
                }
            },

        },
        securitySchemes: {
            userAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT"
            }
        },
    },
    
}

module.exports = apiDoc;


