const graphql = require('graphql')
const db = require('../utils/db')
const userSchema = require('./user/UserSchema')
const registerUserMutation = require('../models/user/mutations/RegisterUser')
const signInMutation = require('./user/mutations/Signin')
const productSchema = require('./product/ProductSchema')
const addProductMutation = require('./product/mutations/AddProduct')


let Query = new graphql.GraphQLObjectType({
    name: 'Query',
    description: 'This is the root query',
    fields: () => {
        return {
            users: {
                type: new graphql.GraphQLList(userSchema),
                args: {
                    id: {
                        type: graphql.GraphQLInt
                    },
                    email: {
                        type: graphql.GraphQLString
                    }
                },
                resolve(root, args) {
                    return db.models.users.findAll({ where: args })
                }
            },
            products: {
                description: 'To price sort (sortPrice:"max") or (sortPrice:"min")',
                type: new graphql.GraphQLList(productSchema),
                args: {
                    id: {
                        type: graphql.GraphQLInt
                    },
                    productName: {
                        type: graphql.GraphQLString
                    },
                    userId: {
                        type: graphql.GraphQLInt
                    },
                    sortPrice: {
                        type: graphql.GraphQLString
                    }
                },
                resolve(root, args) {
                    const sortPrice = args.sortPrice
                    delete (args.sortPrice)
                    if (sortPrice && sortPrice.toLowerCase() == "max")
                        return db.models.products.findAll({ where: args, order: [['price', 'DESC']] })
                    if (sortPrice && sortPrice.toLowerCase() == "min")
                        return db.models.products.findAll({ where: args, order: [['price', 'ASC']] })
                    else
                        return db.models.products.findAll({ where: args })
                }
            }
        }
    }
})

//--------------------------Mutations----------------------------

let Mutation = new graphql.GraphQLObjectType({
    name: 'Mutation',
    description: 'Creating new instances inside tables',
    fields() {
        return {
            registerUser: registerUserMutation,
            addProduct: addProductMutation,
            signIn: signInMutation
        }
    }
})


let schema = new graphql.GraphQLSchema({
    query: Query,
    mutation: Mutation
})

module.exports = schema