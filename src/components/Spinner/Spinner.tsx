import * as React from 'react';
import './Spinner.css';
import IconSpinner from '~/icons/Spinner';

const Spinner: React.SFC = () => {
  return (
    <div className="card-spinner p1">
      <IconSpinner className="card-spinner-icon" />
    </div>
  );
};

export default Spinner;
