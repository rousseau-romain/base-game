import React, { useMemo } from 'react';

import Avatar from '@material-ui/core/Avatar';

const AvatarName = ({ username, color }) => {
  const style = useMemo(() => ({ backgroundColor: color }), [color]);

  return (
    <Avatar style={style}>
      {username.charAt(0)}
    </Avatar>
  );
};

export default AvatarName;
