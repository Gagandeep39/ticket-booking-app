/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-10-23 01:18:21
 * @modify date 2020-10-23 01:18:21
 * @desc Sign In Component
 */
import React, { useState } from 'react';
import useRequest from '../../hooks/use-request';
import Router from 'next/router';

export default function signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [errors, setErrors] = useState([]);
  const { doRequest, errors } = useRequest({
    url: '/api/users/signin',
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
      <h1>Sign In</h1>
      <div className="form-group">
        <label>Email Address</label>
        <input
          type="text"
          required
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

      <button className="btn btn-primary">Sign In</button>
    </form>
  );
}
