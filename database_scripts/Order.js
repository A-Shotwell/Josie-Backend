db.createCollection("Order", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      description: "Customer order structure",
      title: "Order",
      required: [
        "Customer",
        "orderNumber",
        "createdAt",
        "cart",
        "total",
        "paymentMethod",
        "billedTo",
        "shippedTo",
        "fulfilled",
      ],
      properties: {
        Customer: { bsonType: "objectId" },
        orderNumber: { bsonType: "string" },
        createdAt: { bsonType: "date" },
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
        total: { bsonType: "int" },
        paymentMethod: { bsonType: "string" },
        card: {
          bsonType: "object",
          title: "card",
          required: ["name", "cardNumber", "expiration", "validationCode"],
          properties: {
            name: { bsonType: "string" },
            cardNumber: { bsonType: "string", description: "encrypted string" },
            expiration: { bsonType: "string" },
            validationCode: { bsonType: "string", description: "card CVV" },
          },
        },
        billedTo: {
          bsonType: "object",
          title: "address",
          required: ["streetAddress", "city", "state", "zipCode"],
          properties: {
            streetAddress: { bsonType: "string" },
            suiteOrApt: { bsonType: "string" },
            poBox: { bsonType: "string" },
            city: { bsonType: "string" },
            state: { bsonType: "string" },
            zipCode: { bsonType: "string" },
          },
        },
        shippedTo: {
          bsonType: "object",
          title: "address",
          required: ["streetAddress", "city", "state", "zipCode"],
          properties: {
            streetAddress: { bsonType: "string" },
            suiteOrApt: { bsonType: "string" },
            poBox: { bsonType: "string" },
            city: { bsonType: "string" },
            state: { bsonType: "string" },
            zipCode: { bsonType: "string" },
          },
        },
        fulfilled: { bsonType: "bool" },
      },
    },
  },
});
