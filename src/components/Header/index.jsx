import React from 'react';
import PropTypes from 'prop-types';

Header.propTypes = {

};

function Header(props) {
   const { leftComponent, title, rightComponent } = props;

   return (
      <div className="header-user">
         <div className="left-component">
            {leftComponent}
         </div>
         <div className="title-table">
            <p>{title}</p>
         </div>
         <div className="action-component">
            {rightComponent}
         </div>
      </div>
   );
}

export default Header;