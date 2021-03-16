import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getToken } from '@utils/index';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = await getToken();
        setUser(token?.user);
      } catch (error) {
        console.log('user not loaded');
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        setUser,
      }}>
      {children}
    </UserContext.Provider>
  );
};

// doubt

UserProvider.propTypes = {
  children: PropTypes.object.isRequired,
};

export default UserProvider;
