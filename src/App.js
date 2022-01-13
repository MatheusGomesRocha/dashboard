import React from 'react';

import './globals.scss';

import Header from './components/Header';
import Menu from './components/Menu';
import MainScreen from './screens/MainScreen';
import Login from './screens/Login';


// <div>Some Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>

export default function App() {
  return(
    <div className='app'>
      <Login />
      {/* <Header />

      <MainScreen /> */}
    </div>
  )
}