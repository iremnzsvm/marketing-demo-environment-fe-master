import React from 'react';
import './Loader.scss';
import { BeatLoader } from "react-spinners";

const Loader = () => {

  return (
    <div style={{zIndex:2}} className="spinnerContainer d-flex flex-column">
      <div className="flex-grow-1 d-flex align-items-center justify-content-center">
        <BeatLoader/>
      </div>
    </div>
  );
};

export default Loader;
