const Sequelize = require('sequelize')
const productTable = require('../models/product/ProductTable')
const userTable = require('../models/user/UserTable')


const Connection = new Sequelize(
    'test',
    'root',
    '',
    {
        dialect: 'mysql',
        host: 'localhost',
        logging: false
    }
)

Connection
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });
//-------------------------------------------------------------------------

let User = Connection.define('users', userTable)

let Product = Connection.define('products', productTable);

//* Relationships
User.hasMany(Product);
Product.belongsTo(User);

Connection.sync()

module.exports = Connection