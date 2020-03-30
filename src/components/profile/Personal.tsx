import React from 'react';

const Personal = () => {
  return (
    <>
      <div className="field">
        <label className="label">Mobile Number</label>
        <div className="control">
          <input className="input" type="text" disabled={true} />
        </div>
      </div>
      <div className="field">
        <label className="label">First Name</label>
        <div className="control">
          <input className="input" type="text" />
        </div>
      </div>
      <div className="field">
        <label className="label">Last Name</label>
        <div className="control">
          <input className="input" type="text" />
        </div>
      </div>
      <div className="field">
        <div className="control">
          <button className="button is-link">Save</button>
        </div>
      </div>
    </>
  );
};

export default Personal;
