import { PureComponent } from "react";

export default class IconEye extends PureComponent {
   render() {
      return (
         <svg
            width={16}
            height={16}
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...this.props}
         >
            <path
               d="M1 8s2.8-5 7-5 7 5 7 5-2.8 5-7 5-7-5-7-5z"
               stroke="currentColor"
               strokeMiterlimit={10}
               strokeLinecap="round"
            />
            <path d="M8 10a2 2 0 100-4 2 2 0 000 4z" fill="currentColor" />
         </svg>
      )
   }
}