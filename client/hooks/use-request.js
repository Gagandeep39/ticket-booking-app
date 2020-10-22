/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-10-22 17:57:04
 * @modify date 2020-10-22 17:57:04
 * @desc Make a request for us. Tkes url, data, method and input and returns error or response
 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

function useRequest({ url, method, body }) {
  const [errors, setErrors] = useState(null);
  const doRequest = () => {
    axios[method](url, body)
      .then((response) => {
        return response.data;
      })
      .catch((error) =>
        setErrors(
          <div className='alert alert-danger'>
            <h4>Oooops...</h4>
            <ul className='my-0'>
              {error.response.data.errors.map((err) => (
                <li key={err.message}>{err.message}</li>
              ))}
            </ul>
          </div>
        )
      );
  };
  return { doRequest, errors };
}

useRequest.propTypes = {
  url: PropTypes.string.isRequired,
  method: PropTypes.string.isRequired,
  body: PropTypes.object.isRequired,
};

export default useRequest;
