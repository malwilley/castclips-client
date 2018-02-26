/* tslint:disable:max-line-length */

import * as React from 'react';

const Spinner: React.SFC<React.SVGProps<SVGSVGElement>> = (props) => {
    return (
      <svg {...props} version="1.1" id="L9" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="15 15 70 70" enable-background="new 0 0 0 0">
        <path fill={props.fill} d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
          <animateTransform 
            attributeName="transform" 
            attributeType="XML" 
            type="rotate"
            dur="800ms" 
            from="0 50 50"
            to="360 50 50" 
            repeatCount="indefinite"
          />
        </path>
      </svg>
    );
};

export default Spinner;
