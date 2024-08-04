const request = require("supertest")
const app = require("../../server")
const { StatusCodes } = require('http-status-codes');
const User = require("../../Models/user.model");


jest.mock("../../Models/user.model")

describe("GET /users", () => {
    beforeEach(() => {
        jest.resetAllMocks(); // Reset all mocks before each test
    })

    afterEach(() => {
        jest.clearAllMocks();
    })

    it("Should fetch user data successfully", async () => {
        const mockUsers = [
            {
                _id: '66af8837a9b9ca1a21032b97',
                name: 'CaptainAmerica',
                email: 'captainamn@gmail.com',
                password: '$2b$10$CcFRXRnTHJzPTSThQF08AexhXO9WrCH7IbBl340vxGXz908VCPmt6',
                confirmPassword: '$2b$10$dwmAkfEdoCfviqo3ifLRlOch4giGAm15mCsL9plJ507pIwPak3RB6',
                roles: 'USER',
                createdAt: '2024-08-04T13:54:47.736Z',
                isDeleted: false,
                status: false,
                __v: 0,
            },
        ];

        const { _body, statusCode } = await request(app).get("/users")

        expect(statusCode).toBe(StatusCodes.OK)
        expect(_body.message).toBe('Users data fetched successfully')
        expect(_body.data).toHaveLength(1)
        expect(_body.data[0]).toMatchObject(mockUsers[0])

    })

    it("Should return an empty array if no user is found", async () => {
        User.aggregate.mockResoledValue([])
        const { _body, statusCode } = await request(app).get("/users")

        expect(statusCode).toBe(StatusCodes.BAD_REQUEST)
        expect(_body.data).toEqual([])
        expect(_body.message).toBe("Some error occurred, Please try later")
    })
})