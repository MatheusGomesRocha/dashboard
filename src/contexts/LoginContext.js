import { createContext, useState } from 'react';

export const LoginContext = createContext({});

export function LoginContextProvider({ children }) {
    const [userAccount, setUserAccount] = useState(localStorage.getItem('account'));

    function login(accountNumber) {
        localStorage.setItem('account', accountNumber);
        setUserAccount(accountNumber);
    }

    function logout() {
        localStorage.removeItem('account');
        setUserAccount('');
    }

    return (
        <LoginContext.Provider value={{ 
            login,
            userAccount,
            logout
        }}>
            {children}
        </LoginContext.Provider>
    )
}