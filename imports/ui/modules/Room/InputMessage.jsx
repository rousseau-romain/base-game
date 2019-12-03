import React, { useMemo, useCallback, useState } from 'react';
import { Meteor } from 'meteor/meteor';

import colors from '/imports/utils/colors';

import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SendIcon from '@material-ui/icons/Send';


const User = ({ roomId }) => {
  const [message, setMessage] = useState('');

  const fOnChange = useCallback(e => setMessage(e.target.value), []);

  const sendMessage = useCallback(() => {
    Meteor.call('messages.create', ({ roomId, message }), (err) => {
      if (!err) setMessage('');
      else console.log(err);
    });
  }, [message, roomId]);

  const textFieldStyle = useMemo(() => ({
    boxSizing: 'content-box',
    position: 'fixed',
    bottom: '0px',
    backgroundColor: colors('white'),
  }), []);
  return (
    <TextField
      style={textFieldStyle}
      id="standard-multiline-flexible"
      placeholder="Send a message"
      multiline
      fullWidth
      rowsMax="4"
      value={message}
      onChange={fOnChange}
      InputProps={{
        endAdornment: (
          <InputAdornment position="start" onClick={sendMessage} onChange={fOnChange}>
            <SendIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default User;
