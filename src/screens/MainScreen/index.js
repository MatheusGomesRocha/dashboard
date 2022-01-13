import React, { useState, useEffect, useContext } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import InputMask from 'react-input-mask';
import { Oval } from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import { AiFillCloseCircle } from 'react-icons/ai';

import { api } from '../../services/api';
import { LoginContext } from '../../contexts/LoginContext';

import styles from './mainScreen.module.scss';

const data = [
    {name: '22/12', uv: 400, pv: 2400, amt: 2400, amt: 2400},
    {name: '23/12', uv: 200, pv: 2400, amt: 2400, amt: 2400},
    {name: '24/12', uv: 500, pv: 2400, amt: 2400, amt: 2400},
    {name: '25/12', uv: 350.70, pv: 2400, amt: 2400, amt: 2400},
    {name: '26/12', uv: 350.70, pv: 2400, amt: 2400, amt: 2400},
    {name: '27/12', uv: 350.70, pv: 2400, amt: 2400, amt: 2400},
    {name: '28/12', uv: 1950, pv: 2400, amt: 2400, amt: 2400},
];

export default function MainScreen () {
    const { userAccount } = useContext(LoginContext);
    const [openDepositModal, setOpenDepositModal] = useState(false);
    const [openWithdrawModal, setOpenWithdrawModal] = useState(false);

    const [depositValue, setDepositValue] = useState(0);
    const [withdrawValue, setWithdrawValue] = useState(0);

    const [transactions, setTransactions] = useState([]);
    const [saldo, setSaldo] = useState(0);

    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');

    const [loader, setLoader] = useState(true);

    useEffect(() => {
        api.get('704542-1/transactions').then((res) => setTransactions(res.data));
        api.get('704542-1/saldo').then((res) => setSaldo(res.data.saldo));
        api.get('')
    }, []);

    useEffect(() => {
        setTimeout(() => {
            setLoader(false);
        }, 1000)
    }, [loader])

    const CustomTooltip = ({ payload, active }) => {
        if (active) {
          return (
            <div className={styles.customTooltip}>
              <p className="desc">R$ {payload[0].value}</p>
            </div>
          );
        }
      
        return null;
    }

    const ModalHeader = ({ type }) => {
        return(
            <section 
                onClick={type === 'deposit' ? () => setOpenDepositModal(false) : () => setOpenWithdrawModal(false)} 
                className={styles.closeModal}
            >
                <AiFillCloseCircle color="#000" size={25} />
            </section>
        )
    }

    function deposit() {
        api.post('704542-1/deposit', {
            value: depositValue
        }).then((res) => {
            setOpenDepositModal(false);
            setDepositValue(0);
            setLoader(true);
            api.get('704542-1/transactions').then((res) => setTransactions(res.data));
            api.get('704542-1/saldo').then((res) => setSaldo(res.data.saldo));
        })
    }

    function withdraw() {
        api.post('704542-1/withdraw', {
            value: withdrawValue
        }).then((res) => {
            setOpenWithdrawModal(false);
            setWithdrawValue(0);
            setLoader(true);
            api.get('704542-1/transactions').then((res) => setTransactions(res.data));
            api.get('704542-1/saldo').then((res) => setSaldo(res.data.saldo));
        })
    }

    function transactionFilter() {
        if(dateFrom && dateTo) {
            api.post('704542-1/transactionsFilter', {
                from: dateFrom,
                to: dateTo,
            }).then((res) => {
                setTransactions(res.data);
                setLoader(true);
            });
        }
    }

    return(
        <div className={styles.container}>
            {openDepositModal ? 
                <div className={styles.modalContainer}>
                    <div className={styles.modal}>
                        <ModalHeader type="deposit" />
                        <p>Quanto você quer depositar na sua conta?</p>

                        <input 
                            value={depositValue}
                            onChange={v => setDepositValue(v.target.value)} 
                            type="number" 
                            placeholder="Exemplo: 550.75" 
                        />

                        <div onClick={deposit} className={styles.depositButton}>
                            <span>Depositar</span>
                        </div>
                    </div>
                </div>
            : null}

            {openWithdrawModal ? 
                <div className={styles.modalContainer}>
                    <div className={styles.modal}>
                        <ModalHeader type="withdraw" />

                        <p>Quanto você quer retirar da sua conta?</p>
                        <input 
                            value={withdrawValue} 
                            onChange={v => setWithdrawValue(v.target.value)} 
                            type="number" 
                            placeholder="Exemplo: 550.75" 
                        />
                        
                        <div onClick={withdraw} className={styles.withdrawButton}>
                            <span>Retirar</span>
                        </div>
                    </div>
                </div>
            : null}

            <section className={styles.leftContainer}>
                <h2>Overview</h2>

                <div className={styles.valueItem}>
                    <span className={styles.account}>Conta: <strong>20225687-9</strong></span>
                    <p>Saldo Total</p>
                    
                    {loader ? 
                        <div className={styles.loader}>
                            <Oval type="Oval" color="#000" height={30} width={30} />
                        </div>
                        :
                        <div>
                            <span className={styles.value}>R$ {saldo.toFixed(2)}</span>
                        </div>
                    }

                    <div className={styles.inlineButton}>
                        <div onClick={() => setOpenDepositModal(true)} className={styles.depositButton}>
                            <span>Depositar dinheiro</span>
                        </div>

                        <div onClick={() => setOpenWithdrawModal(true)} className={styles.withdrawButton}>
                            <span>Retirar dinheiro</span>
                        </div>
                    </div>
                </div>

                <div className={styles.historyArea}>
                    <div className={styles.header}>
                        <h2>Histórico de transações</h2>

                        <div className={styles.dateArea}>
                            <div className={styles.date}>
                                <span>De:</span>
                                <InputMask 
                                    value={dateFrom} 
                                    onChange={v => setDateFrom(v.target.value)} 
                                    placeholder="01-01-2022" 
                                    className={styles.input} 
                                    mask="99-99-9999"
                                ></InputMask>
                            </div>
                            <div className={styles.date}>
                                <span>Até:</span>
                                <InputMask
                                    value={dateTo} 
                                    onChange={v => setDateTo(v.target.value)} 
                                    placeholder="02-01-2022" 
                                    className={styles.input} 
                                    mask="99-99-9999"
                                ></InputMask>
                            </div>

                            <div onClick={transactionFilter} className={styles.filterButton}>

                            </div>
                        </div>
                    </div>

                    <table className={styles.transactionArea}>
                        {loader ? 
                        <div style={{margin: '5rem 0'}} className={styles.loader}>
                            <Oval type="Oval" color="#000" height={30} width={30} />
                        </div> 
                        : 
                        transactions.map((item, k) => (
                            <tbody key={k}>
                                <td style={{color: item.type === 'withdraw' ? '#CA0808' : '#548C1D'}} className={styles.type}>{item.type === 'withdraw' ? 'Saque' : 'Depósito'}</td>
                                <td className={styles.date}>{item.date}</td>
                                <td style={{color: item.type === 'withdraw' ? '#CA0808' : '#548C1D'}} className={styles.value}>{item.type === 'withdraw' ? '-' : '+'} R$ {item.value.toFixed(2)}</td>
                            </tbody>
                        ))}
                    </table>
                </div>
            </section>

            <section className={styles.rightContainer}>
                <h2>Histórico do saldo</h2>

                <BarChart style={{marginTop: '.5rem'}} width={500} height={300} data={data}>
                    <XAxis dataKey="name" stroke="#000" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <Bar dataKey="uv" fill="#0028f3" barSize={30} />
                </BarChart>
            </section>
        </div>
    )
}