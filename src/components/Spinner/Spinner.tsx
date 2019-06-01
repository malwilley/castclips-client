import * as React from 'react';
import IconSpinner from 'src/icons/Spinner';
import './Spinner.css';

const Spinner: React.SFC = () => {
  return (
    <div className="card-spinner p1">
      <IconSpinner className="card-spinner-icon" />
    </div>
  );
};

export default Spinner;
