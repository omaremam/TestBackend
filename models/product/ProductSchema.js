const graphql = require('graphql')

let Product = new graphql.GraphQLObjectType({
    name: 'Product',
    description: 'This represents a product',
    fields: () => {
        return {
            id: {
                type: graphql.GraphQLInt,
                resolve(product) {
                    return product.id
                }
            },
            productName: {
                type: graphql.GraphQLString,
                resolve(product) {
                    return product.productName
                }
            },
            price: {
                type: graphql.GraphQLInt,
                resolve(product) {
                    return product.price
                }
            },
            userId: {
                type: graphql.GraphQLInt,
                resolve(product) {
                    return product.userId
                }
            }
        }
    }
});

module.exports = Product