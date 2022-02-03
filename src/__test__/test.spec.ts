import supertest from 'supertest';
// import request from 'supertest';
import app from '../app';
import { mongoMockConnect, mongoDBConnect } from '../database/database';
let request: supertest.SuperTest<supertest.Test>;
let accessToken = "";
let id = "";
beforeAll(async () => {
    await mongoMockConnect();
    request = supertest(app)
});


describe("Endpoints for adding friends", () => {
    
    const data = {
        friend: {
            email: "davidmomoh@gmail.com"
        }
    };

    test("Add friends", async () => {
        const response = await request
            .post('/friends')
            .send(data)
            .set(`Authorization`, `Bearer ${accessToken}`);
        id = response.body.data.friend._id

        expect(response.status).toBe(201);
        expect(response.body.status).toBe("success");
        expect(response.body).toHaveProperty("data");
        expect(response.body.data).toBe(friend);
    });
});

describe("Endpoints for getting all friends",  () => {
    test("Get all Friends", async () => {
        const response = await request
            .get("/friends")
            .set(`Authorization`, `Bearer ${accessToken}`);

        expect(response.status).toBe(200);
        expect(response.body.status).toBe("success");
        expect(response.body).toHaveProperty("data");
        expect(response.body).toHaveProperty("results");
        expect(response.body.data).toBe(friends);
    });
});

function friend(friend: any) {
    throw new Error('Function not implemented.');
}
function friends(friends: any) {
    throw new Error('Function not implemented.');
}
