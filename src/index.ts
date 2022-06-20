import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import cors from 'cors';
import router from './routes';
import cookieParser from 'cookie-parser';

import { postDbConnection } from './helpers/db';

const app = express();
const port = process.env.PORT || 4000;

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(cookieParser());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.use(router);

mongoose
  .connect(`${process.env.DATABASE_URL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(postDbConnection)
  .catch((err) => console.log('error', err));

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

export default app;
