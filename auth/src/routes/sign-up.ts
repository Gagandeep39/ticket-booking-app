/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-10-21 12:32:35
 * @modify date 2020-10-21 12:32:35
 * @desc Manage Registration routes
 */
import express from 'express';
const router = express.Router();

router.post('/api/users/signup', (req, res) => res.send('Sign Up route'));

export { router as signUpRouter };
