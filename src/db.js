import mongoose from 'mongoose';

const DB_URI = process.env.DB_URI;


async function initDatabaseConnection() {
  await mongoose.connect(DB_URI);
}
export {initDatabaseConnection};
