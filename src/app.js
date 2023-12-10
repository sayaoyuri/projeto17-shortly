import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes/index.routes.js';
import errorHadlingMiddleware from './middlewares/error.hadling.middleware.js';

const app = express();
app.use(cors()).use(express.json()).use(router).use(errorHadlingMiddleware);

dotenv.config();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}/`));
