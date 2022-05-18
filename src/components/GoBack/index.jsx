import React from 'react';
import PropTypes from 'prop-types';
import IconBack from '@/assets/icons/IconBack';
import { useHistory } from 'react-router';

function GoBack() {
   const history = useHistory()

   return (
      <button className="btn-back" onClick={() => { history.goBack() }}>
         <IconBack />
         Back
      </button>
   );
}

export default GoBack;