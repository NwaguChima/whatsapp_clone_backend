import request from 'supertest';
import app from '../app';

// describe("LOGIN FEATURE", () => {
//     const mockData1 = {
//         email: "notavalidemail@getMaxListeners.com",
//         password: "afakeuser"
//     }

//     const mockData2 =  {
//         firstName: "david",
//         lastName: "adejo",
//         email: "jenono@gmail.com",
//         password: "string",
//         avatar:"knyygyyygygy",
//         phoneNumber: "08189441180"
//       }

//     test("should validate wrong data input", async () => {
//         const response = await request(app).post('/api/v1/user/login').send(mockData1)

//         expect(response.status).toBe(400)
//         expect(response.body.message).toBe("user does not exist, kindly signup")
//     })
// })