/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-10-22 17:14:49
 * @modify date 2020-10-22 17:14:49
 * @desc Sign Up Component
 */
import React, { useState } from 'react';
import useRequest from '../../hooks/use-request';
import Router from 'next/router';

export default function signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [errors, setErrors] = useState([]);
  const { doRequest, errors } = useRequest({
    url: '/api/users/signup',
    body: { email, password },
    method: 'post',
    onSuccess: () => Router.push('/'),
  });

  const onSubmit = (event) => {
    event.preventDefault();
    doRequest();
  };

  return (
    <form onSubmit={onSubmit}>
      <h1>Sign Up</h1>
      <div className="form-group">
        <label>Email Address</label>
        <input
          type="text"
          className="form-control"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {errors}

      <button className="btn btn-primary">Sign Up</button>
    </form>
  );
}
