var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const prometheusBundle = require("express-prom-bundle")

const { initialize } = require('express-openapi');
const swaggerUi = require("swagger-ui-express");

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.listen("3090");

var port = process.env.api_port
var host = process.env.api_host
var docURL = `http://${host}:${port}/api-docs`

const metricsMiddleware = prometheusBundle({
    includeMethod:true,
    includePath:true,
    includeStatusCode: true,
    includeUp: true,
    customLables: {project_name: "MetroGameAPI", project_type:"api_service"},
    promClient: {
        collectDefaultMetrics: {
            
        }
    }
    
});

app.use(metricsMiddleware);

initialize({
    app,
    apiDoc: require("./api/api-doc"),
    paths: "./api/paths"
});

app.use(
    "/api-documentation",
    swaggerUi.serve,
    swaggerUi.setup(null, {
        swaggerOptions: {
            url: docURL
        }
    })
)

module.exports = app;