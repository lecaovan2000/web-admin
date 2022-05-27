import React, { PureComponent } from 'react';

class IconAddCancel extends PureComponent {
   render() {
      return (
         <svg
            width={16}
            height={16}
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
         >
            <path
               d="M2.13306 2.57837L13.9505 14.2951"
               stroke="currentColor"
               strokeWidth="1.5"
               strokeMiterlimit={10}
               strokeLinecap="round"
               strokeLinejoin="round"
            />
            <path
               d="M2.13306 14.2952L13.9505 2.57839"
               stroke="currentColor"
               strokeWidth="1.5"
               strokeMiterlimit={10}
               strokeLinecap="round"
               strokeLinejoin="round"
            />
         </svg>
      );
   }
}

export default IconAddCancel;
