import React, { useContext } from 'react';

import './globals.scss';

import Header from './components/Header';
import Menu from './components/Menu';
import MainScreen from './screens/MainScreen';
import Login from './screens/Login';

import { LoginContext } from './contexts/LoginContext';

// <div>Some Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>

export default function App() {
  const { userAccount } = useContext(LoginContext);

  return(
    <div className='app'>
      {userAccount ? 
        <>
          <Header />
          <MainScreen />
        </>
      : 
        <>
          <Header />
          <MainScreen />
        </>
        // <Login />
      } 
    </div>
  )
}