import { createContext, useState } from 'react';

export const LoginContext = createContext({});

export function LoginContextProvider({ children }) {
    const [userAccount, setUserAccount] = useState(localStorage.getItem('account'));
    const [userName, setUserName] = useState(localStorage.getItem('name'));
    const [userAvatar, setUserAvatar] = useState(localStorage.getItem('avatar'));

    function login(accountNumber, name, avatar) {
        localStorage.setItem('account', accountNumber);
        localStorage.setItem('name', name);
        localStorage.setItem('avatar', avatar);

        setUserAccount(accountNumber);
        setUserName(name);
        setUserAvatar(avatar);
    }

    function logout() {
        localStorage.removeItem('account');
        localStorage.removeItem('name');
        localStorage.removeItem('avatar');

        setUserAccount('');
        setUserName('');
        setUserAvatar('');
    }

    return (
        <LoginContext.Provider value={{ 
            login,
            userAccount,
            userName,
            userAvatar,
            logout,
        }}>
            {children}
        </LoginContext.Provider>
    )
}