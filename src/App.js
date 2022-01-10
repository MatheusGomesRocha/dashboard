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
  const [isLogin, setIsLogin] = useState(false);

  function submit() { 
    if(cpf.isValid(cpfNumber)) {
      setCpf(cpf.format(cpfNumber));
      setIsValidCpf(true)
    } else {
      setIsValidCpf(false);
    }
  }

  function changeForm() {
    setIsLogin(!isLogin);
    setCpf('');
  }

  return(
    <div className={styles.container}>
      <form>
          <h2>{isLogin ? 'Acesse sua conta' : 'Criar nova conta'}</h2>

          {isLogin ? 
            <>
              <div style={{width: '30rem'}} className={styles.inputArea}>
                <label>CPF</label>
                <input 
                  style={{borderColor: isValidCpf ? '#afb2b1' : '#ff0000'}} 
                  onBlur={submit} 
                  onChange={v => setCpf(v.target.value)} 
                  value={cpfNumber}  
                />
              </div>

              <div style={{marginTop: '1rem', width: '30rem'}} className={styles.inputArea}>
                <label>Senha</label>
                <input />
              </div>
            </>
          :
          <>
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
                <input 
                  style={{borderColor: isValidCpf ? '#afb2b1' : '#ff0000'}} 
                  onBlur={submit} 
                  onChange={v => setCpf(v.target.value)} 
                  value={cpfNumber} 
                />
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
          </>
          }

          <div style={{width: isLogin ? '30rem' : '40%'}} onClick={submit} className={styles.submit}>
            <span>{isLogin ? 'Login' : 'Criar conta'}</span>
          </div>

          <div className={styles.goToLogin}>
            <p>{isLogin ? 'Não tem uma conta?' : 'Já tem uma conta?'}</p>
            <span onClick={changeForm}>{isLogin ? 'Cadastre-se' : 'Login'}</span>
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