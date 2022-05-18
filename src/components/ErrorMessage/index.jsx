import React from 'react';
import PropTypes from 'prop-types';
import { ErrorMessage } from '@hookform/error-message';

CustomErrorMessage.propTypes = {

};

function CustomErrorMessage(props) {
   const { errors, name } = props
   return (
      <ErrorMessage
         errors={errors}
         name={name}
         render={({ message }) => <p className="error-message color--danger">{message}</p>}
      />
   );
}

export default CustomErrorMessage;