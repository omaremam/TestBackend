const graphql = require('graphql')
const db = require('../../../utils/db')
const userSchema = require('../UserSchema')
const bcrypt = require('bcryptjs');

const signIn = {
    name: 'Sign in User',
    description: 'Sign in a user by specifying email(STRING) and password(STRING)',
    type: userSchema,
    args: {
        email: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
        password: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) }
    },
    async resolve(_, args) {
        const user = await db.models.users.findOne({ where: {email: args.email } })
        if(!user) return new Error('Email does not exist')
        const validpassword = await bcrypt.compare(args.password, user.password);
        if(!validpassword) return new Error('Password is not correct')
        return user
    }
}

module.exports = signIn