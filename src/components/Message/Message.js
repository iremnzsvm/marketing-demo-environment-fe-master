import React from 'react';

const Message = ( {text, type = 'warning'} ) => (
  <div>
    <div className={`alert alert-${type}`} role="alert">
      {text}
    </div>
  </div>
);

export default Message;
