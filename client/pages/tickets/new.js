/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-12-31 12:18:06
 * @modify date 2020-12-31 12:18:06
 * @desc Creates a new ticket
 */

import React, { useState } from 'react';

const NewTicket = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');

  const onBlur = () => {
    const value = parseFloat(price);

    if (isNaN(value)) return;

    setPrice(value.toFixed(2));
  };

  return (
    <div>
      <h1>Create a ticket</h1>
      <form>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            onBlur={onBlur}
            className="form-control"
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default NewTicket;
