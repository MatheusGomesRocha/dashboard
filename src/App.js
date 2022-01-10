import React, { useState } from 'react';
import { cpf } from 'cpf-cnpj-validator'; 

import './globals.scss';
import styles from './login.module.scss';

import BankSvg from './assets/svg/bank.svg';

import Header from './components/Header';
import Menu from './components/Menu';
import MainScreen from './components/MainScreen';


// <div>Some Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>

export default function App() {
  const [cpfNumber, setCpf] = useState('');
  const [isValidCpf, setIsValidCpf] = useState(true);

  function submit() { 
    if(cpf.isValid(cpfNumber)) {
      setCpf(cpf.format(cpfNumber));
      setIsValidCpf(true)
    } else {
      setIsValidCpf(false);
    }
  }

  return(
    <div className={styles.container}>
      <div className={styles.sideArea}>
        <p>Salve seu dinheiro com segurança e agilidade</p>
        <img src={BankSvg} />
      </div>

      <form>
          <h2>Criar nova conta</h2>

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

          {/* ------------------------------------------------------- */}

          <div className={styles.inlineInput}>
            <div className={styles.inputArea}>
              <label>CPF</label>
              <input style={{borderColor: isValidCpf ? '#afb2b1' : '#ff0000'}} onBlur={submit} onChange={v => setCpf(v.target.value)} value={cpfNumber} />
            </div>
            
            <div className={styles.inputArea}>
              <label>Email</label>
              <input />
            </div>
          </div>

          {/* ------------------------------------------------------- */}

          <div className={styles.inlineInput}>
            <div className={styles.inputArea}>
              <label>Senha</label>
              <input type="password" />
            </div>
            
            <div className={styles.inputArea}>
              <label>Confrimar senha</label>
              <input type="password" />
            </div>
          </div>

          <div onClick={submit} className={styles.submit}>
            <span>Criar conta</span>
          </div>

          <div className={styles.goToLogin}>
            <p>Já tem uma conta?</p>
            <span>Login</span>
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