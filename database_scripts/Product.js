db.createCollection("Product", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      description: "Product entity",
      title: "Product",
      required: ["name", "description", "variants"],
      properties: {
        name: { bsonType: "string" },
        description: { bsonType: "string" },
        variants: {
          bsonType: "array",
          items: {
            title: "Variant",
            required: ["name", "description", "price", "inStock"],
            properties: {
              name: { bsonType: "string" },
              description: { bsonType: "string" },
              price: { bsonType: "int", description: "variant price in cents" },
              inStock: { bsonType: "int" },
              images: { bsonType: "array", items: { bsonType: "binData" } },
            },
          },
        },
      },
    },
  },
});
