import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Blog de aprendizaje",
            version: "1.0.0",
            description: "API para de blog de aprendizaje",
            contact: {
                name: "Javier Alejnadro Hernandez Ochoa",
                email: "jhernandez-2020439@gkinal.edu.gt"
            }
        },
        servers: [
            {
                url: "http://127.0.0.1:3001/blog/v1"
            }
        ]
    },
    apis: [
        "./src/comments/comment.routes.js",
        "./src/publications/publication.routes.js",

    ]
}

const swaggerDocs = swaggerJSDoc(options)

export { swaggerDocs, swaggerUi }