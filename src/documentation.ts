import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Express-MySQL-Prisma API ",
    version: "0.0.1",
    license: {
      name: "Licensed Under MIT",
      url: "https://spdx.org/licenses/MIT.html",
    },
    contact: {
      name: "Sarder Safa Bin Salam",
      url: "https://github.com/kushal2908/express-mysql-prisma",
    },
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Development server",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./routes/*.ts"],
};

export const swaggerSpec = swaggerJSDoc(options);
