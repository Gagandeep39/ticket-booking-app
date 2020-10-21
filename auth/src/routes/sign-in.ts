/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-10-21 12:32:30
 * @modify date 2020-10-21 12:32:30
 * @desc Manage Signin routes
 */
import express from 'express';
const router = express.Router();

router.post('/api/users/signin', (req, res) => res.send('Sign In Routes'));

export { router as signInRouter };
