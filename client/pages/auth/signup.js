/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-10-22 17:14:49
 * @modify date 2020-10-22 17:14:49
 * @desc Sign Up Component
 */
import React, { useState } from 'react';
import axios from 'axios';

export default function signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const onSubmit = (event) => {
    event.preventDefault();
    console.log(email, password);
    axios
      .post('/api/users/signup', { email, password })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => setErrors(error.response.data.errors));
  };

  return (
    <form onSubmit={onSubmit}>
      <h1>Sign Up</h1>
      <div className='form-group'>
        <label>Email Address</label>
        <input
          type='text'
          className='form-control'
          name='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className='form-group'>
        <label>Password</label>
        <input
          type='password'
          className='form-control'
          name='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {errors.length > 0 && (
        <div className='alert alert-danger'>
          <h4>Oooops...</h4>
          <ul className='my-0'>
            {errors.map((err) => (
              <li>{err.message}</li>
            ))}
          </ul>
        </div>
      )}

      <button className='btn btn-primary'>Sign Up</button>
    </form>
  );
}
