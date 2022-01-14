import React, { useState, useContext } from 'react';
import { cpf } from 'cpf-cnpj-validator'; 
import InputMask from 'react-input-mask';
import { useMediaQuery } from 'react-responsive'

import styles from './login.module.scss';

import ViewOn from '../../assets/icons/view.png';
import ViewOff from '../../assets/icons/view-off.png';

import { api } from '../../services/api';
import { LoginContext } from '../../contexts/LoginContext';

// <div>Some Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>

export default function Login() {
  const isMobile = useMediaQuery({ query: '(max-width: 800px)' })

  const { login } = useContext(LoginContext);

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

  const [errorMsg, setErrorMsg] = useState('');

  function validCpf() { 
    const formatedCpfNumber = cpfNumber.replace(/[^0-9]/g, '')

    if(cpf.isValid(formatedCpfNumber)) {
      setIsValidCpf(true);
      setCpf(formatedCpfNumber);
    } else {
      setIsValidCpf(false);
    }
  }

  function changeForm() {
    setIsLogin(!isLogin);
    setErrorMsg('');
    setCpf('');
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setShowPassword(false);
    setShowConfirmPassword(false);
  }

  function submitRegister() {
    if(isValidCpf) {
      if(firstName && lastName && cpfNumber && email && password && confirmPassword) {
        if(password === confirmPassword) {
          api.post('createUser', {
            name: firstName + ' ' + lastName,
            email: email,
            cpf: cpfNumber,
            password: password
          }).then((res) => setErrorMsg(res.data.error));
        } else {
          setErrorMsg('Senhas não coincidem');

          setTimeout(() => {
            setErrorMsg('');
          }, 3000)
        }
      } else {
        setErrorMsg('Preencha todos os campos')

        setTimeout(() => {
          setErrorMsg('');
        }, 3000)
      }
    } else {
      setErrorMsg('CPF inválido');

      setTimeout(() => {
        setErrorMsg('');
      }, 3000)
    }
  }

  function submitLogin() {
    if(cpfNumber && password) {
      api.post('login', {
        cpf: cpfNumber,
        password: password
      }).then((res) => {
        if(res.data.error) {
          setErrorMsg('Dados incorretos');
          setTimeout(() => {
            setErrorMsg('');
          }, 3000);
        } else {
          login(res.data.result.account, res.data.result.name, res.data.result.avatar);
        }
      })
    } else {
      setErrorMsg('Preencha todos os campos');
      setTimeout(() => {
        setErrorMsg('');
      }, 3000);
    }
  }

  return(
    <div className={styles.container}>
      <form>
          <h2>{isLogin ? 'Acesse sua conta' : 'Criar nova conta'}</h2>

          {errorMsg ? 
            <div className={styles.errorMsg}>
              <span>{errorMsg}</span>
            </div>
          : null
          }

          {isLogin ? 
            <>
              <div style={{width: isMobile ? '100%' : '30rem'}} className={styles.inputArea}>
                <label>CPF</label>
                <InputMask 
                  value={cpfNumber}
                  onChange={v => setCpf(v.target.value)} 
                  onBlur={validCpf} 
                  className={styles.input} 
                  style={{borderColor: isValidCpf ? '#afb2b1' : '#ff0000'}} 
                  mask="999.999.999-99"
                ></InputMask>
              </div>

              <div style={{marginTop: '1rem', width: isMobile ? '100%' : '30rem'}} className={styles.inputArea}>
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
                <InputMask 
                  value={cpfNumber}
                  onChange={v => setCpf(v.target.value)} 
                  onBlur={validCpf} 
                  className={styles.input} 
                  style={{borderColor: isValidCpf ? '#afb2b1' : '#ff0000'}} 
                  mask="999.999.999-99"
                ></InputMask>
              </div>
              
              <div className={styles.inputArea}>
                <label>Email</label>
                <input onChange={v => setEmail(v.target.value)} value={email} />
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

          <div onClick={isLogin ? submitLogin : submitRegister} style={{width: isLogin ? '60%' : '50%'}} className={styles.submit}>
            <span>{isLogin ? 'Login' : 'Criar conta'}</span>
          </div>

          <div className={styles.goToLogin}>
            <p>{isLogin ? 'Não tem uma conta?' : 'Já tem uma conta?'}</p>
            <span onClick={changeForm}>{isLogin ? 'Cadastre-se' : 'Login'}</span>
          </div>
      </form>
    </div>
  )
}