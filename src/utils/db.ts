import mongoose from 'mongoose';

export const mongoDB = {
    mongoose,
    connect: () => {
      mongoose.Promise = Promise;
      mongoose.connect(process.env.DATABASE_CONNECTION);
    },
    disconnect: done => {
      mongoose.disconnect();
      done()
    }
  };