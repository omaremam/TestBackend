const supertest = require("supertest");
const app = require('../index')
const db = require('../utils/db')
const request = supertest(app)


test('Get users', async (done) => {
    request.post('/graphql').send({
        query: "{users{id,name,email}}"
    }).set("Accept", "application/json").expect("Content-Type", /json/).expect(200).end(function (err, res) {
        if (err) return done(err);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.data.users).toBeDefined()
        expect(res.body.data.users[0].email).toBeDefined()
        done();
    })
})

test('Get products Ascending', async (done) => {
    request.post('/graphql').send({
        query: `{products(sortPrice:"min"){id,productName,price,userId}}`
    }).set("Accept", "application/json").expect("Content-Type", /json/).expect(200).end(function (err, res) {
        if (err) return done(err);
        console.log(res.body.data)
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.data.products).toBeDefined()
        expect(res.body.data.products[0].price).toBeDefined()
        var ascendingFlag = true
        for (i = 0; i < res.body.data.products.length - 1; i++) {
            if (res.body.data.products[i].price > res.body.data.products[i + 1].price)
                ascendingFlag = false
        }
        expect(ascendingFlag).toBe(true)
        done();
    })
})

test('Get products Descending', async (done) => {
    request.post('/graphql').send({
        query: `{products(sortPrice:"max"){id,productName,price,userId}}`
    }).set("Accept", "application/json").expect("Content-Type", /json/).expect(200).end(function (err, res) {
        if (err) return done(err);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.data.products).toBeDefined()
        expect(res.body.data.products[0].price).toBeDefined()
        var descendingFlag = true
        for (i = 0; i < res.body.data.products.length - 1; i++) {
            if (res.body.data.products[i].price < res.body.data.products[i + 1].price)
                descendingFlag = false
        }
        expect(descendingFlag).toBe(true)
        done();
    })
})

test('Register user', async (done) => {
    request.post('/graphql').send({
        query: `mutation addUser {
            registerUser(email: "test@gmail.com", password: "1234567", name: "Omar") {
              id
              email
              name
            }
          }`
    }).set("Accept", "application/json").expect("Content-Type", /json/).expect(200).end(function (err, res) {
        if (err) return done(err);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.data.registerUser).toBeDefined()
        expect(res.body.data.registerUser.email).toBe('test@gmail.com')
        expect(res.body.data.registerUser.name).toBe('Omar')
        done();
    })
})

test('Sign in user', async (done) => {
    request.post('/graphql').send({
        query: `mutation signInUser {
        signIn(email: "test@gmail.com", password: "1234567"){
            id
            email
            name
        }
    }`}).set("Accept", "application/json").expect("Content-Type", /json/).expect(200).end(function (err, res) {
            if (err) return done(err);
            expect(res.body).toBeInstanceOf(Object);
            expect(res.body.data.signIn).toBeDefined()
            expect(res.body.data.signIn.email).toBe('test@gmail.com')
            expect(res.body.data.signIn.name).toBe('Omar')
            db.models.users.destroy({ where: { email: 'test@gmail.com' } })
            done();
        })
})

test('Add product', async (done) => {
    request.post('/graphql').send({
        query: `mutation addProducts {
        addProduct(productName: "Test", price: 100, userId: 1){
            productName
            price
            userId
        }
    }`}).set("Accept", "application/json").expect("Content-Type", /json/).expect(200).end(function (err, res) {
            if (err) return done(err);
            console.log(res.body.data)
            expect(res.body).toBeInstanceOf(Object);
            expect(res.body.data.addProduct).toBeDefined()
            expect(res.body.data.addProduct.productName).toBe('Test')
            expect(res.body.data.addProduct.price).toBe(100)
            expect(res.body.data.addProduct.userId).toBe(1)
            db.models.products.destroy({ where: { productName: 'Test' } })
            done();
        })
})