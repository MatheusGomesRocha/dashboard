import { createContext, useState } from 'react';

export const LoginContext = createContext({});

export function LoginContextProvider({ children }) {
    const [userAccount, setUserAccount] = useState('');

    function login(accountNumber) {
        setUserAccount(accountNumber);
    }

    return (
        <LoginContext.Provider value={{ 
            login,
            userAccount,
        }}>
            {children}
        </LoginContext.Provider>
    )
}