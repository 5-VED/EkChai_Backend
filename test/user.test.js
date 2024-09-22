let chai = require('chai')
let chaiHttp = require('chai-http')
const { expect } = chai;

let server = require("../server")
let User = require('../Models/user.model')

chai.use(chaiHttp)

describe("Users API", () => {

    /**
     * Sould fetch all the Users
     */
    describe("GET /users", () => {
        it("sould return user data when role are USER", async () => {
            // Create a User 
            const user = await User.create({
                "name": "John Doe",
                "email": "john@yopmail.com",
                "password": "password",
                "confirmPassword": "password"
            })

            const res = await chai.request(server).get('/users')
            expect(res).to.have.status(200)
            expect(res.body).to.have.property("message", "Users data fetched successfully")
            expect(res.body.data).to.be.an('array').that.is.not.empty;
        })

    })
})

