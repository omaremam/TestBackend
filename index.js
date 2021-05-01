const express = require('express');
const app = express();
const cors = require('cors')
const GraphHTTP = require('express-graphql').graphqlHTTP
const Schema = require('./models/schema')


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, X-Auth-Token, Content-Type, Accept"
  );
  // res.header("Access-Control-Expose-Headers", "Access-Token", "X-Auth-Token")
  next();
});
app.use(
  cors({
    exposedHeaders: "X-Auth-Token"
  })
);

// * database connection

app.use(express.json());

app.use('/graphql', GraphHTTP({
  schema: Schema,
  pretty: true,
  graphiql: true
}))

const port = 5000;
app.listen(port, () => console.log('Server running'));

module.exports = app