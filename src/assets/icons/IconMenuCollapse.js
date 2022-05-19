import * as React from "react"

function IconMenuCollapse(props) {
   return (
      <svg
         width={24}
         height={24}
         viewBox="0 0 24 24"
         fill="none"
         xmlns="http://www.w3.org/2000/svg"
         {...props}
      >
         <path
            d="M3 4h18M3 12h9M3 20h18"
            stroke="#797979"
            strokeWidth={2}
            strokeMiterlimit={10}
            strokeLinejoin="round"
         />
      </svg>
   )
}

export default IconMenuCollapse
