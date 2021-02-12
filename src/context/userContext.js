import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getToken } from '@utils/index';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState();
  useEffect(() => {
    const loadUser = async () => {
      const token = await getToken();
      if (token) {
        setUser(token.user);
      }
    };
    loadUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.number.isRequired,
};

export default UserProvider;
