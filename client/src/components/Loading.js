import React from 'react';
import './Loading.css';
import logo from '../loading.gif';

function Loading() {
  return (
    <div>
      <div className="load">
        <img src={logo} alt="loading" />
      </div>
    </div>
  );
}

export default Loading;
