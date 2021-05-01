const graphql = require('graphql')
const db = require('../../../utils/db')
const userSchema = require('../UserSchema')
const bcrypt = require('bcryptjs');


const registerUser = {
    name: 'Register User',
    description: 'Register a user by specifying name(STRING), email(STRING) and password(STRING)',
    type: userSchema,
    args: {
        name: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
        email: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
        password: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) }
    },
    async resolve(_, args) {
        const salt = await bcrypt.genSalt(10);
        args.password = await bcrypt.hash(args.password, salt);
        return db.models.users.create({
            name: args.name,
            email: args.email,
            password: args.password,
            createdAt: new Date(),
            updatedAt: new Date()
        })
    }
}

module.exports = registerUser