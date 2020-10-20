/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-10-20 19:15:19
 * @modify date 2020-10-20 19:15:19
 * @desc Auth microservice
 */
import express from 'express';
import { json } from 'body-parser';
import morgan from 'morgan';

const app = express();

app.use(json());
app.use(morgan('tiny'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Auth service started on port ${PORT}`));
