import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoute from './routes/user.route.js';

dotenv.config();

mongoose.connect(process.env.MONGO).then(() => {
  console.log('Connected to MongoDB!!!');
})
.catch((err) => {
  console.log('Error connecting to MongoDB!!!', err);
});

const app = express();

app.use('/api/user', userRoute);

app.listen(3000, () => {
  console.log('Server is running on port 3000!!!');
})