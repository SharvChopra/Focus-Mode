import React from 'react';
import './WavyDivider.css';

const WaveDivider = () => (
  <div style={{ lineHeight: 0 }} className='divider'>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
      <path 
        fill="#f9fafb"
        fillOpacity="1" 
        d="M0,224L48,213.3C96,203,192,181,288,186.7C384,192,480,224,576,245.3C672,267,768,277,864,256C960,235,1056,181,1152,160C1248,139,1344,149,1392,154.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
      ></path>
    </svg>
  </div>
);

export default WaveDivider;