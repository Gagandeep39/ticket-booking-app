/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-10-21 01:26:11
 * @modify date 2020-10-21 01:26:11
 * @desc Auth service bussiness logic
 */
import express from 'express';

export const fetchCurrentUser = (
  req: express.Request,
  res: express.Response
): any => res.send('Current User');
