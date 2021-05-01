const graphql = require('graphql')

const User = new graphql.GraphQLObjectType({
    name: 'User',
    description: 'This represents a user',
    fields: () => {
        return {
            id: {
                type: graphql.GraphQLInt,
                resolve(user) {
                    return user.id;
                }
            },
            name: {
                type: graphql.GraphQLString,
                resolve(user) {
                    return user.name
                }
            },
            email: {
                type: graphql.GraphQLString,
                resolve(user) {
                    return user.email
                }
            }
        }
    }
});


module.exports = User