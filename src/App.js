import React, { useState } from 'react';
import { cpf } from 'cpf-cnpj-validator'; 

import './globals.scss';
import styles from './login.module.scss';

import BankSvg from './assets/svg/bank.svg';

import ViewOn from './assets/icons/view.png';
import ViewOff from './assets/icons/view-off.png';

import Header from './components/Header';
import Menu from './components/Menu';
import MainScreen from './components/MainScreen';


// <div>Some Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>

export default function App() {
  const [isValidCpf, setIsValidCpf] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [cpfNumber, setCpf] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setShowPassword(false);
    setShowConfirmPassword(false);
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
                <div className={styles.inputWrapped}>
                  <input type={showPassword ? 'text' : 'password'} onChange={v => setPassword(v.target.value)} value={password} />
                  <img onClick={() => setShowPassword(!showPassword)} src={showPassword ? ViewOn : ViewOff} />
                </div>
              </div>
            </>
          :
          <>
            <div className={styles.inlineInput}>
              <div className={styles.inputArea}>
                <label>Primeiro nome</label>
                <input type="text" onChange={v => setFirstName(v.target.value)} value={firstName} />
              </div>

              <div className={styles.inputArea}>
                <label>Segundo nome</label>
                <input type="text" onChange={v => setLastName(v.target.value)} value={lastName} />
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
                  type="text"
                />
              </div>
              
              <div className={styles.inputArea}>
                <label>Email</label>
                <input type="email" onChange={v => setEmail(v.target.value)} value={email} />
              </div>
            </div>

            {/* ------------------------------------------------------- */}

            <div className={styles.inlineInput}>
              <div className={styles.inputArea}>
                <label>Senha</label>
                  <div className={styles.inputWrapped}>
                    <input type={showPassword ? 'text' : 'password'} onChange={v => setPassword(v.target.value)} value={password} />
                    <img onClick={() => setShowPassword(!showPassword)} src={showPassword ? ViewOn : ViewOff} />
                  </div>              
                </div>
              
              <div className={styles.inputArea}>
                <label>Confrimar senha</label>
                <div className={styles.inputWrapped}>
                  <input type={showConfirmPassword ? 'text' : 'password'} onChange={v => setConfirmPassword(v.target.value)} value={confirmPassword} />
                  <img onClick={() => setShowConfirmPassword(!showConfirmPassword)} src={showConfirmPassword ? ViewOn : ViewOff} />
                </div>
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