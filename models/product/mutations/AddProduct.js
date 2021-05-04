const graphql = require('graphql')
const db = require('../../../utils/db')
const productSchema = require('../ProductSchema')

const addProduct = {
    name: "Add product",
    description: "Add product by specifying productName(STRING), price(INT) and the user which issued the product userId(INT)",
    type: productSchema,
    args: {
        productName: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
        price: { type: new graphql.GraphQLNonNull(graphql.GraphQLInt) },
        userId: { type: new graphql.GraphQLNonNull(graphql.GraphQLInt) }
    },
    resolve(_, args) {
        return db.models.products.create({
            productName: args.productName,
            price: args.price,
            userId: args.userId,  //! userId should be verified but frontend is trusted in this case (FK of user table).
            createdAt: new Date(),
            updatedAt: new Date()
        })
    }
}

module.exports = addProduct