import express from 'express';
import Routes from './routes';

const app = express();

//Middlewares
app.use(express.json());


//Routes
app.use(Routes);

export default app;

