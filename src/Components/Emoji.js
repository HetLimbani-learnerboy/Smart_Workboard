import React from 'react';

const Emoji = ({ symbol, label }) => (
  <span
    className="emoji"
    role="img"
    aria-label={label ? label : ""}
    aria-hidden={label ? "false" : "true"}
    style={{ marginRight: '0.3em' }}
  >
    {symbol}
  </span>
);
export default Emoji;
