import { createContext, useContext, useState } from 'react'


const authContext = createContext()

const ContextProvider = ({children}) => {
    const [user, setUser] = useState(() => {
  const storedUser = localStorage.getItem('user');
  return storedUser ? JSON.parse(storedUser) : null;
});

   const login = (user) => {
  setUser(user);
  localStorage.setItem('user', JSON.stringify(user));
};
    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
         localStorage.removeItem('token');
      };
  return (
    <div>
      <authContext.Provider value={{user, login, logout}}>
        {children}
        </authContext.Provider>
    </div>
  );
};

export const useAuth = () => useContext(authContext)

export default ContextProvider;
