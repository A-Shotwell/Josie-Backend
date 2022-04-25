db.createCollection("Customer", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      description: "Site visitor entity",
      title: "Customer",
      required: ["firstName", "lastName", "cart"],
      properties: {
        firstName: { bsonType: "string" },
        lastName: { bsonType: "string" },
        email: { bsonType: "string" },
        phone: { bsonType: "string" },
        cookie: { bsonType: "string" },
        cart: {
          bsonType: "array",
          items: {
            title: "CartItem",
            required: ["productID", "variant", "number"],
            properties: {
              productID: { bsonType: "string" },
              variant: {
                bsonType: "object",
                title: "Variant",
                required: ["name", "description", "price", "inStock"],
                properties: {
                  name: { bsonType: "string" },
                  description: { bsonType: "string" },
                  price: {
                    bsonType: "int",
                    description: "variant price in cents",
                  },
                  inStock: { bsonType: "int" },
                  images: { bsonType: "array", items: { bsonType: "binData" } },
                },
              },
              number: { bsonType: "int" },
            },
          },
        },
      },
    },
  },
});
