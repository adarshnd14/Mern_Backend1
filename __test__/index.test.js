const request = require('supertest')
const app = require('../app.js')

//Proper working of Register end point
describe('POST /register', () => {
    test('Register woring fine', async() => { 
        const res = await request(app)
        .post('/register')
        .set('Accept','application/json')
        .send({
            //have to change the name and password for test because it will be registered from previous test
            "uName":"123344",
            "uEmail":"123344@gmail.com",
            "uPhone":123344,
            "uRole":"admin",
            "uPassword":"123344@gmail.com"
        })
        expect(res.statusCode).toEqual(201)
     }, 6000)
});

//When we try registering with same userName and Password response status should be 409 
describe('POST /register', () => {
    test('Try registering already registered credentials', async() => { 
        const res = await request(app)
        .post('/register')
        .set('Accept','application/json')
        .send({
            //have to give already registered username and password
            "uName":"Adarsh",
            "uEmail":"Adarsh@gmail.com",
            "uPhone":54565213,
            "uRole":"admin",
            "uPassword":"Adarsh@gmail.com"
        })
        expect(res.statusCode).toEqual(409)
     }, 6000)
});

//Proper working of Login end point
describe('POST /login', () => {
    test('Login  working fine', async () => {
        const res = await request(app)
            .post('/login')
            .set('Accept', 'application/json')
            .send({
                "uEmail":"1233444@gmail.com",
                "uPassword": "1233444@gmail.com"
            })
            expect(res.statusCode).toEqual(200)
    }, 6000)
});

//When we give unregistered Login credentials Login end point should respond with status 401 (unAuthorized)
describe('POST /login', () => {
    test('False Login or credential not match any registered data ', async () => {
        const res = await request(app)
            .post('/login')
            .set('Accept', 'application/json')
            .send({
                //notRegistered@gmail.com should not be registered
                "uEmail":"notRegistered@gmail.com",
                "uPassword": "notRegistered@gmail.com"
            })
            expect(res.statusCode).toEqual(401)
    }, 6000)
});

