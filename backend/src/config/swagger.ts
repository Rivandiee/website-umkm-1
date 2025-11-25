import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "UMKM Rumah Makan API",
      version: "1.0.0",
      description: "Dokumentasi API untuk sistem manajemen Rumah Makan UMKM",
      contact: {
        name: "Developer",
      },
    },
    servers: [
      {
        url: "http://localhost:4000/api",
        description: "Local Development Server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  // Lokasi file yang berisi anotasi swagger
  apis: [
  "./src/routes/*.ts",
  "./src/routes/**/*.ts"
]
};

export const swaggerSpec = swaggerJsdoc(options);