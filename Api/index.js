import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import dns from 'dns';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import listingRouter from './routes/listing.route.js';
import contactRouter from './routes/contact.route.js';

dotenv.config();

// Some local DNS resolvers (VPN/router stub resolvers) refuse SRV record
// queries, which breaks mongodb+srv:// lookups even though normal DNS works.
// Forcing a public resolver here avoids that failure mode.
dns.setServers(['8.8.8.8', '1.1.1.1']);

mongoose.connect(process.env.MONGO)
  .then(() => {
    console.log('Connected to MongoDB!!!');
  })
  .catch((err) => {
    console.log('Error connecting to MongoDB!!!', err);
  });

const app = express();
app.use(express.json());
app.use(cookieParser());

// app.get('/test', (req, res)=> {
//   res.json({message: 'Hehehehe Kia dekh rh ho?'})
// });

app.use('/api/user', userRouter)
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);
app.use('/api/contact', contactRouter);


app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
