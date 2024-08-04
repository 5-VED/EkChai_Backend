// // Import the necessary modules
// const request = require("supertest")
// const app = require("../../server")
// const { signIn } = require("../../Helpers/user.helper");
// const User = require("../../Models/user.model");
// const bcrypt = require('bcrypt'); // Assuming bcrypt is the source
// const jwt = require("jsonwebtoken");

// jest.mock('jsonwebtoken'); // Mock jwt module


// describe('Sign In', () => {
//     beforeEach(() => {
//         jest.resetAllMocks(); // Reset all mocks before each test
//     });

//     it('Should return an error for invalid credentials', async () => {
//         const payload = { email: 'user@example.com', password: 'incorrectPassword' };
//         jest.spyOn(User, 'findOne').mockResolvedValue(null); // Mock User.findOne
//         const compareSyncSpy = jest.spyOn(bcrypt, 'compareSync'); // Spy on imported compareSync

//         const result = await signIn(payload);
//         expect(result).toEqual({ login: false, message: 'Invalid Credentials' });
//         expect(compareSyncSpy).not.toHaveBeenCalled(); // No password comparison if user not found

//     });


//     it('Should return an error if user is not active', async () => {
//         const user = { email: 'user@example.com', password: 'validPassword', status: false };
//         const payload = { email: user.email, password: 'validPassword' };
//         compareSync.mockReturnValue(true); // Mock successful password comparison
//         jest.spyOn(User, 'findOne').mockResolvedValue(user);

//         const result = await signIn(payload);

//         expect(result).toEqual({ login: false, message: 'Waiting for Admin Approval' });
//         expect(compareSync).toHaveBeenCalledTimes(1); // Password comparison for valid user
//         expect(compareSync).toHaveBeenCalledWith(payload.password, user.password); // Verify arguments
//     });

//     it('should return a successful response with an access token for a valid active user', async () => {
//         const user = { email: 'user@example.com', password: 'validPassword', status: true };
//         const payload = { email: user.email, password: 'validPassword' };
//         compareSync.mockReturnValue(true); // Mock successful password comparison
//         jest.spyOn(User, 'findOne').mockResolvedValue(user);
//         const expectedAccessToken = 'mocked_access_token';
//         jwt.sign.mockReturnValue(expectedAccessToken); // Mock JWT signing

//         const result = await signIn(payload);

//         expect(result).toEqual({
//             login: true,
//             message: 'success',
//             data: user,
//             accessToken: expectedAccessToken,
//         });
//         expect(compareSync).toHaveBeenCalledTimes(1); // Password comparison for valid user
//         expect(compareSync).toHaveBeenCalledWith(payload.password, user.password); // Verify arguments
//         expect(jwt.sign).toHaveBeenCalledTimes(1); // JWT signing for successful login
//         expect(jwt.sign).toHaveBeenCalledWith({ email: user.email, roles: user.roles }, process.env.ACCESS_TOKEN, { expiresIn: '8h' }); // Verify JWT signing arguments
//     });

//     it('should handle errors during User.findOne', async () => {
//         const payload = { email: 'user@example.com', password: 'validPassword' };
//         jest.spyOn(User, 'findOne').mockRejectedValue(new Error('Database error'));

//         try {
//             await signIn(payload);
//             fail('Expected an error to be thrown');
//         } catch (error) {
//             expect(error.message).toBe('Database error');
//         }
//     });

//     it('should handle errors during JWT signing', async () => {
//         const user = { email: 'user@example.com', password: 'validPassword', status: true };
//         const payload = { email: user.email, password: 'validPassword' };
//         compareSync.mockReturnValue(true); // Mock successful password comparison
//         jest.spyOn(User, 'findOne').mockResolvedValue(user);
//         jwt.sign.mockImplementation(() => { throw new Error('JWT signing error'); });

//         try {
//             await signIn(payload);
//             fail('Expected an error to be thrown');
//         } catch (error) {
//             expect(error.message).toBe('JWT signing error');
//         }
//     });
// });







// jest.mock('../../Models/user.model');
// jest.mock('bcrypt', () => ({
//     compareSync: jest.fn()
// }));
// jest.mock('jsonwebtoken', () => ({
//     sign: jest.fn()
// }));

// describe('signIn', () => {
//     const email = 'test@example.com';
//     const password = 'password123';

//     beforeEach(() => {
//         User.findOne.mockClear();
//         compareSync.mockClear();
//         jwt.sign.mockClear();
//     });

//     it('should return success and token if credentials are valid and user is approved', async () => {
//         const user = {
//             email,
//             password: 'hashedPassword',
//             roles: ['user'],
//             status: true,
//             isDeleted: false
//         };

//         User.findOne.mockResolvedValue(user);
//         compareSync.mockReturnValue(true);
//         jwt.sign.mockReturnValue('mockAccessToken');

//         const result = await signIn({ email, password });

//         expect(result.login).toBe(true);
//         expect(result.message).toBe('success');
//         expect(result.data).toEqual(user);
//         expect(result.accessToken).toBe('mockAccessToken');
//     });

//     it('should return waiting message if user is not approved', async () => {
//         const user = {
//             email,
//             password: 'hashedPassword',
//             roles: ['user'],
//             status: false,
//             isDeleted: false
//         };

//         User.findOne.mockResolvedValue(user);
//         compareSync.mockReturnValue(true);

//         const result = await signIn({ email, password });

//         expect(result.login).toBe(false);
//         expect(result.message).toBe('Waiting for Admin Approval');
//     });

// it('should return invalid credentials message if credentials are incorrect', async () => {
//     User.findOne.mockResolvedValue(null);
//     compareSync.mockReturnValue(false);

//     const result = await signIn({ email, password });

//     expect(result.login).toBe(false);
//     expect(result.message).toBe('Invalid Credentials');
// });

//     it('should handle case where user is found but password is incorrect', async () => {
//         const user = {
//             email,
//             password: 'hashedPassword',
//             roles: ['user'],
//             status: true,
//             isDeleted: false
//         };

//         User.findOne.mockResolvedValue(user);
//         compareSync.mockReturnValue(false);

//         const result = await signIn({ email, password });

//         expect(result.login).toBe(false);
//         expect(result.message).toBe('Invalid Credentials');
//     });
// });

