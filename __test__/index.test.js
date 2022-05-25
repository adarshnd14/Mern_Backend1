const request = require('supertest')
const app = require('../app.js')

//Proper working of Register end point
// describe('POST /register', () => {
//     test('Register woring fine', async () => {
//         const res = await request(app)
//             .post('/register')
//             .set('Accept', 'application/json')
//             .send({
//                 //have to change the name and password for test because it will be registered from previous test
//                 "uName": "123344",
//                 "uEmail": "123344@gmail.com",
//                 "uPhone": 123344,
//                 "uRole": "admin",
//                 "uPassword": "123344@gmail.com"
//             })
//         expect(res.statusCode).toEqual(201)
//     }, 6000)
// });

//When we try registering with same userName and Password response status should be 409 
describe('POST /register', () => {
    test('Try registering already registered credentials', async () => {
        const res = await request(app)
            .post('/register')
            .set('Accept', 'application/json')
            .send({
                //have to give already registered username and password
                "uName": "Adarsh",
                "uEmail": "Adarsh@gmail.com",
                "uPhone": 54565213,
                "uRole": "admin",
                "uPassword": "Adarsh@gmail.com"
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
                "uEmail": "1233444@gmail.com",
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
                "uEmail": "notRegistered@gmail.com",
                "uPassword": "notRegistered@gmail.com"
            })
        expect(res.statusCode).toEqual(401)
    }, 6000)
});

//Checking Add product authorization 
describe('POST /products/addproduct', () => {
    let token = null;
    beforeEach((done) => {
        request(app)
            .post('/login')
            .send({
                //use registered credentials
                "uEmail": "Adarsh@gmail.com",
                "uPassword": "Adarsh@gmail.com"
            })
            .end((req, res) => {
                token = res.body.data.token
                done()
            })
    })
    test('Add Product', async () => {
        const res = await request(app)
            .post('/products/addproduct')
            //Setting auth token
            .set('Authorization', `Bearer ${token}`)
            .send({
                pName: 'Xiaomi 11i 5G',
                pPrice: 22499,
                pBrand: 'Mi',
                pDesc: '120W charger comes with XIaomi 11i HyperCharge & 67W charger comes with Xiaomi 11i',
                pImg: 'https://i01.appmifile.com/v1/MI_18455B3E4DA706226CF7535A58E875F0267/pms_1641485855.26112991.png?thumb=1&w=606&h=404&width=606&height=404'
            })
        expect(res.statusCode).toBe(200)
    }, 6000)
})

describe('PUT /products/editproduct', () => {
    let token = null;
    beforeEach((done) => {
        request(app)
            .post('/login')
            .send({
                //use registered credentials
                "uEmail": "Adarsh@gmail.com",
                "uPassword": "Adarsh@gmail.com"
            })
            .end((req, res) => {
                token = res.body.data.token
                done()
            })
    })
    test('Edit Product', async () => {
        const res = await request(app)
            .put('/products/editproduct?_id=628dd48ae8594be74218eada')
            //Setting auth token
            .set('Authorization', `Bearer ${token}`)
            .send({
                pName: 'Xiaomi 11i 7G',
                pPrice: 22499,
                pBrand: 'Mi',
                pDesc: '120W charger comes with XIaomi 11i HyperCharge & 67W charger comes with Xiaomi 11i',
                pImg: 'https://i01.appmifile.com/v1/MI_18455B3E4DA706226CF7535A58E875F0267/pms_1641485855.26112991.png?thumb=1&w=606&h=404&width=606&height=404'
            })
            expect(res.statusCode).toBe(200)
    }, 6000)
});
