import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import Pusher from 'pusher';
import { Message } from '../models/MessageModel';

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID as string,
  key: process.env.PUSHER_APP_KEY as string,
  secret: process.env.PUSHER_APP_SECRET as string,
  cluster: 'eu',
  useTLS: true,
});

export const mongoDBConnect = () => {
  try {
    const DB = process.env.MONGO_URL?.replace(
      '<PASSWORD>',
      process.env.MONGO_PASS!
    ) as string;

    // Connect to MongoDB
    mongoose
      .connect(DB)
      .then(() => {
        console.log(`DB connection successful....`);

        // Connect to Pusher
        const changeStream = Message.watch();

        changeStream.on('change', (change) => {
          console.log(change);
        });
      })
      .catch((err) => {
        console.log(`DB connection error: ${err}`);
      });

    // Connect to Socket.io
  } catch (error) {
    console.log(error);
  }
};

export const mongoMockConnect = () => {
  try {
    MongoMemoryServer.create().then((mongo) => {
      const uri = mongo.getUri();

      mongoose.connect(uri).then(() => {
        console.log(`Mock DB connected...`);
      });
    });
  } catch (error) {
    console.log(error);
  }
};
