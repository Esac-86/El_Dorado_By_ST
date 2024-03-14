import React from 'react'
import { Link } from 'react-router-dom'

const MyBoton = ({ className, text, linkTo, children, onClick }) => {

    const buttonContent = linkTo ? (
      <Link to={linkTo} className={className}>
        {text}
        {children}
      </Link>
    ) : (
      <button onClick={onClick} className={className}>
      {text}
      {children}
    </button>
    );
  
    return buttonContent;
  };
  
  export default MyBoton;