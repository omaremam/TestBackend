const Sequelize = require('sequelize')

const productTable = {
    productName: {
        type: Sequelize.STRING(50),
        allowNull: false,
        validate: {
            len: {
                args: [0, 50],
            }
        }
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}

module.exports = productTable
