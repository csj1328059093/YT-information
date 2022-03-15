import { useState } from 'react';

export default () => {
  const [currentUser, setCurrentUser] = useState(undefined);
  return {
    currentUser,
    setCurrentUser,
    setting: {},
  };
};
