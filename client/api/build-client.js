/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-10-23 01:05:43
 * @modify date 2020-10-23 01:05:43
 * @desc Helper method to set headers
 */

import axios from 'axios';

const buildClient = ({ req }) => {
  // Endsup with error
  // const response = await axios.get('/api/users/currentUser');
  if (typeof window === 'undefined') {
    // We are on server
    return axios.create({
      baseURL: `http://${process.env.NEXT_PUBLIC_INGRESS_URI}`,
      headers: req.headers,
    });
  } else {
    return axios.create({
      baseURL: '/',
    });
  }
};

export default buildClient;
