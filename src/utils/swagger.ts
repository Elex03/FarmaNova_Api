import swaggerJSDoc from "swagger-jsdoc";
import path from "path";

const options : swaggerJSDoc.Options = {
    definition: {
        openapi: "3.0.0", 
        info: {
            title: 'FarmaNova Api Documentation', 
            version: '1.0.0', 
            description: "FarmaNova is a system created to manage pharmacy operations efficiently."
        }, 
    }, 
    apis:[`${path.join(__dirname, '../router/*')}`]
}

const swaggerSpec = swaggerJSDoc(options)

export default swaggerSpec