import React,{ createContext, useContext, useState } from 'react'


const authContext = createContext()

const ContextProvider = ({children}) => {
    const [user, setUser] = useState(null)
  return (
    <div>
      <authContext.Provider value={{user}}>
        {children}
        </authContext.Provider>
    </div>
  );
};

export const useAuth = () => useContext(authContext)

export default ContextProvider;
