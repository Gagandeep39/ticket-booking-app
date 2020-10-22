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

/**
 * 
 * @param url Url to make a request to
 * @param method GET, POST etc.
 * @param body Data to be sent
 * @param onSuccess Callback to be executed on success
 * To use this Hook
 * 1. User Creates the hook with all required data
 * 2. Sends a request by calling doRequest()
 * 3. On error, an Error UI is recieved in response
 * 4. On success the callback function is called
 */
function useRequest({ url, method, body, onSuccess }) {
  const [errors, setErrors] = useState(null);
  const doRequest = () => {
    axios[method](url, body)
      .then((response) => {
        // Will be called if user provides a callback and there is o error in making request
        if (onSuccess) onSuccess(response.data);
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
  onSuccess: PropTypes.func.isRequired,
};

export default useRequest;
