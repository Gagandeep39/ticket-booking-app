/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-10-21 12:26:39
 * @modify date 2020-10-21 12:26:39
 * @desc Manage routes for CUrrently logged in user
 */
import express from 'express';
const router = express.Router();

router.get('/api/users/currentuser', (req, res) => res.send('Current User'));

export { router as currentUserRouter };
