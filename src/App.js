import React from 'react';

import './globals.scss';

import Header from './components/Header';
import Menu from './components/Menu';


// <div>Some Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>

export default function App() {
  return(
    <div className='app'>
      <Menu />

      <main>
        <Header />
      </main>
    </div>
  )
}