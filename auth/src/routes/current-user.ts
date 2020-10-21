/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-10-21 12:26:39
 * @modify date 2020-10-21 12:26:39
 * @desc Manage routes for CUrrently logged in user
 */
import express from 'express';
import jwt from 'jsonwebtoken';
const router = express.Router();

router.get('/api/users/currentuser', (req, res, next) => {
  if (!req.session || !req.session.jwt) return res.send({ currentUser: null });
  if (!process.env.JWT_KEY) throw new Error('JWT Secret key Not found');

  try {
    const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY);
    res.send({ currentUser: payload });
  } catch (error) {
    res.send({ currentUser: null });
  }
});

export { router as currentUserRouter };
