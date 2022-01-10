import React from 'react';

import './globals.scss';
import styles from './login.module.scss';

import Header from './components/Header';
import Menu from './components/Menu';
import MainScreen from './components/MainScreen';


// <div>Some Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>

export default function App() {
  return(
    <div className='app'>
      <form>
        <h2>Criar nova conta</h2>

        <div className={styles.goToLogin}>
          <p>Já tem uma conta?</p>
          <span>Login</span>
        </div>

        <div className={styles.inputArea}>
          <label>CPF</label>
          <input />
        </div>

        <div className={styles.inlineInput}>
          <div className={styles.inputArea}>
            <label>Primeiro nome</label>
            <input />
          </div>

          <div className={styles.inputArea}>
            <label>Segundo nome</label>
            <input />
          </div>
        </div>
      </form>
      {/* <Menu />

      <main>
        <Header />

        <MainScreen />
      </main> */}
    </div>
  )
}