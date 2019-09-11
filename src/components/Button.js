import React from "react";
import classnames from 'classnames';
import "components/Button.scss";


export default function Button(props) {
    // change the color/type of class applied to the button based on what button is defined in other props
   const buttonClass = classnames("button", {
     "button--confirm": props.confirm,
     "button--danger": props.danger
   });

   return (
     <button
       className={buttonClass}
       onClick={props.onClick}
       disabled={props.disabled}
     >
         {props.children}
     </button>
   );
 }