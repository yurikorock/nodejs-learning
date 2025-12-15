import mongoose from 'mongoose';
import { getEnvVariable } from './utils/getEnvVariable.js';

const DB_URI = getEnvVariable('DB_URI');

async function initDatabaseConnection() {
  await mongoose.connect(DB_URI);
  console.log('✅ MongoDB connected');
}
export { initDatabaseConnection };
