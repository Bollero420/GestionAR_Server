import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import router from '../src/routes';
import { JWT_CONFIG } from './config/config';
import { authenticatedRoutes } from './middlewares/authenticated-routes';
import { APP_KEY_LABEL } from './utils/constants';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.set(APP_KEY_LABEL, JWT_CONFIG.key);
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(authenticatedRoutes)
app.use(router);

mongoose
  .connect(`${process.env.DATABASE_URL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('DB connected'))
  .catch(err => console.log('error', err));

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
})

export default app;