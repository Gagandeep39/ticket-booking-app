/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-10-21 12:32:32
 * @modify date 2020-10-21 12:32:32
 * @desc Manage Signout routes
 */
import express from 'express';
const router = express.Router();

router.post('/api/users/signout', (req, res) => res.send('Sign out route'));

export { router as signOutRouter };
