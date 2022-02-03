// import supertest from 'supertest';
// import request from 'supertest';
// import app from '../app';

// describe('Test to confirm if a user recieves either a private or group message', () => {
//   it('Throw an error if a user is unable to successfully recieve a message', async () => {
//     const data = {
//       chatId: '61fa6bfa7806d877c91629dd',
//     };
//     await supertest(app)
//       .get('./chatId/messages')
//       .send(data)
//       .set('Accept', 'application/json')
//       .expect(404)
//       .expect((res: any) => {
//         expect(res.body.error).toBe('Unable to get messages');
//       });
//   });
// });
