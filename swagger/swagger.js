const swaggerJSDoc = require("swagger-jsdoc");
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Node service",
            version: "1.0.0",
            description: "Api documentation for Node service",
            contac: {
                name: "Jorge Natanael"
            },
            servers: [
                {
                    url: "http://localhost:3000",
                    description: "Development server"
                }
            ]
        }
    },
   apis: ["./src/routes/api/*.js"]
};

const specs = swaggerJSDoc(options);
module.exports = specs;