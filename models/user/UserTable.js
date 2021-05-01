const Sequelize = require('sequelize')

const userTable = {
    name: {
        type: Sequelize.STRING(50),
        allowNull: false,
        validate: {
            len: {
                args: [0, 50],
            }
        }
    },
    email: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
        unique: {
            args: true,
            msg: 'Email address already in use'
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [6, 200],
                msg: 'Password must be atleast 6 characters'
            }
        }
    }
}

module.exports = userTable