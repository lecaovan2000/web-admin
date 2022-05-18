import React from 'react';
import PropTypes from 'prop-types';

HeaderRightAction.propTypes = {

};

function HeaderRightAction(props) {
   const { icon, text, onClick, bordered } = props;

   const handleClick = (e) => {
      if (onClick) onClick();
   }
   return (
      <button className={`header__right-btn ${bordered ? 'bordered' : ''}`} onClick={handleClick}>
         {icon}
         {text}
      </button>
   );
}

export default HeaderRightAction;