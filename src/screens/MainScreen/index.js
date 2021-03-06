import React, { useState, useEffect, useContext } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import InputMask from 'react-input-mask';
import { Oval } from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { useMediaQuery } from 'react-responsive'

import { AiFillCloseCircle } from 'react-icons/ai';
import { BiSearch } from 'react-icons/bi';

import { api } from '../../services/api';
import { LoginContext } from '../../contexts/LoginContext';

import styles from './mainScreen.module.scss';

export default function MainScreen () {
    const isSmallMobile = useMediaQuery({ query: '(max-width: 500px)' })

    const { userAccount } = useContext(LoginContext);
    
    const [openDepositModal, setOpenDepositModal] = useState(false);
    const [openWithdrawModal, setOpenWithdrawModal] = useState(false);
    const [openDeleteHistoryModal, setOpenDeleteHistoryModal] = useState(false);

    const [transactionId, setTransactionId] = useState(0);

    const [depositValue, setDepositValue] = useState(0);
    const [withdrawValue, setWithdrawValue] = useState(0);

    const [transactions, setTransactions] = useState([]);
    const [saldo, setSaldo] = useState(0);

    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');

    const [loader, setLoader] = useState(true);

    const [todayValue, setTodayValue] = useState(0);
    const [yesterdayValue, setYesterdayValue] = useState(0);
    const [twoDaysValue, setTwoDaysValue] = useState(0);
    const [threeDaysValue, setThreeDaysValue] = useState(0);
    const [fourDaysValue, setFourDaysValue] = useState(0);
    const [fiveDaysValue, setFiveDaysValue] = useState(0);

    useEffect(() => {
        api.get(`${userAccount}/transactions`).then((res) => setTransactions(res.data));
        api.get(`${userAccount}/saldo`).then((res) => setSaldo(res.data.saldo));
        api.get(`${userAccount}/balanceHistory`).then((res) => {
            setTodayValue(res.data.today);
            setYesterdayValue(res.data.yesterday);
            setTwoDaysValue(res.data.twoDays);
            setThreeDaysValue(res.data.threeDays);
            setFourDaysValue(res.data.fourDays);
            setFiveDaysValue(res.data.fiveDays);
        });
    }, []);

    var hoje = new Date();

    var today = new Date(hoje.getTime());
    var yesterday = new Date(hoje.getTime());
    var twoDays = new Date(hoje.getTime());
    var threeDays = new Date(hoje.getTime());
    var fourDays = new Date(hoje.getTime());
    var fiveDays = new Date(hoje.getTime());
    
    today.setDate(hoje.getDate());
    yesterday.setDate(hoje.getDate() - 1);
    twoDays.setDate(hoje.getDate() - 2);
    threeDays.setDate(hoje.getDate() - 3);
    fourDays.setDate(hoje.getDate() - 4);
    fiveDays.setDate(hoje.getDate() - 5);

    var dd = today.getDate();
    var mm = today.getMonth()+1;

    var dd1 = yesterday.getDate();
    var mm1 = yesterday.getMonth()+1;

    var dd2 = twoDays.getDate();
    var mm2 = twoDays.getMonth()+1;

    var dd3 = threeDays.getDate();
    var mm3 = threeDays.getMonth()+1;

    var dd4 = fourDays.getDate();
    var mm4 = fourDays.getMonth()+1;

    var dd5 = fiveDays.getDate();
    var mm5 = fiveDays.getMonth()+1;

    if(dd<10) {
        dd='0'+dd;
    } if(mm<10) {
        mm='0'+mm;
    } 

    if(dd1<10) {
        dd1='0'+dd1;
    } if(mm1<10) {
        mm1='0'+mm1;
    } 
    if(dd2<10) {
        dd2='0'+dd2;
    } if(mm2<10) {
        mm2='0'+mm2;
    } 
    if(dd3<10) {
        dd3='0'+dd3;
    } if(mm3<10) {
        mm3='0'+mm3;
    } 
    if(dd4<10) {
        dd4='0'+dd4;
    } if(mm4<10) {
        mm4='0'+mm4;
    } 
    if(dd5<10) {
        dd5='0'+dd5;
    } if(mm5<10) {
        mm5='0'+mm5;
    } 

    const data = [
        {name: dd + '/' + mm, uv: todayValue, pv: 2400, amt: 2400, amt: 2400},
        {name: dd1 + '/' + mm1, uv: yesterdayValue, pv: 2400, amt: 2400, amt: 2400},
        {name: dd2 + '/' + mm2, uv: twoDaysValue, pv: 2400, amt: 2400, amt: 2400},
        {name: dd3 + '/' + mm3, uv: threeDaysValue, pv: 2400, amt: 2400, amt: 2400},
        {name: dd4 + '/' + mm4, uv: fourDaysValue, pv: 2400, amt: 2400, amt: 2400},
        {name: dd5 + '/' + mm5, uv: fiveDaysValue, pv: 2400, amt: 2400, amt: 2400},
    ];

    useEffect(() => {
        setTimeout(() => {
            setLoader(false);
        }, 1500)
    }, [loader]);

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
        api.post(`${userAccount}/deposit`, {
            value: depositValue
        }).then((res) => {
            setOpenDepositModal(false);
            setDepositValue(0);
            setLoader(true);
            api.get(`${userAccount}/transactions`).then((res) => setTransactions(res.data));
            api.get(`${userAccount}/saldo`).then((res) => setSaldo(res.data.saldo));
            api.get(`${userAccount}/balanceHistory`).then((res) => {
                setTodayValue(res.data.today);
            });
        })
    }

    function withdraw() {
        api.post(`${userAccount}/withdraw`, {
            value: withdrawValue
        }).then((res) => {
            setOpenWithdrawModal(false);
            setWithdrawValue(0);
            setLoader(true);
            api.get(`${userAccount}/transactions`).then((res) => setTransactions(res.data));
            api.get(`${userAccount}/saldo`).then((res) => setSaldo(res.data.saldo));
            api.get(`${userAccount}/balanceHistory`).then((res) => {
                setTodayValue(res.data.today);
            });
        })
    }

    function transactionFilter() {
        if(dateFrom && dateTo) {
            api.post(`${userAccount}/transactionsFilter`, {
                from: dateFrom,
                to: dateTo,
            }).then((res) => {
                setTransactions(res.data);
                setLoader(true);
            });
        }
    }

    function openTransaction($id) {
        setOpenDeleteHistoryModal(true);
        setTransactionId($id);
    }

    function deleteTransactionHistory() {
        api.post(`${userAccount}/${transactionId}/delete`).then((res) => {
            setOpenDeleteHistoryModal(false);
            setLoader(true);

            api.get(`${userAccount}/transactions`).then((res) => setTransactions(res.data));
        });
    }

    return(
        <div className={styles.container}>
            {openDeleteHistoryModal ? 
                <div className={styles.modalHistoryContainer}>
                    <div className={styles.modalHistory}>
                        <p>Voc?? deseja apagar esse dado do hist??rico?</p>

                        <div className={styles.inlineButton}>
                            <div onClick={deleteTransactionHistory} className={styles.deleteButton}>
                                <span>Apagar</span>
                            </div>
                            <div onClick={() => setOpenDeleteHistoryModal(false)} className={styles.cancelButton}>
                                <span>Cancelar</span>
                            </div>
                        </div>
                    </div>
                </div>
                : null
            }
            
            {openDepositModal ? 
                <div className={styles.modalContainer}>
                    <div className={styles.modal}>
                        <ModalHeader type="deposit" />
                        <p>Quanto voc?? quer depositar na sua conta?</p>

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

                        <p>Quanto voc?? quer retirar da sua conta?</p>
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
                    <span className={styles.account}>Conta: <strong>{userAccount}</strong></span>
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
                        <h2>Hist??rico de transa????es</h2>

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
                                <span>At??:</span>
                                <InputMask
                                    value={dateTo} 
                                    onChange={v => setDateTo(v.target.value)} 
                                    placeholder="02-01-2022" 
                                    className={styles.input} 
                                    mask="99-99-9999"
                                ></InputMask>
                            </div>

                            <div onClick={transactionFilter} className={styles.filterButton}>
                                <BiSearch color="#000" size={20} />
                            </div>
                        </div>
                    </div>

                    <table className={styles.transactionArea}>
                        {loader ? 
                            <div style={{margin: '5rem 0'}} className={styles.loader}>
                                <Oval type="Oval" color="#000" height={30} width={30} />
                            </div> 
                            : 
                            <tbody>
                                {transactions.map((item, k) => (
                                    <div onClick={() => openTransaction(item.id)} key={k}>
                                        <td style={{color: item.type === 'withdraw' ? '#CA0808' : '#548C1D'}} className={styles.type}>{item.type === 'withdraw' ? 'Saque' : 'Dep??sito'}</td>
                                        <td className={styles.date}>{item.date}</td>
                                        <td style={{color: item.type === 'withdraw' ? '#CA0808' : '#548C1D'}} className={styles.value}>{item.type === 'withdraw' ? '-' : '+'} R$ {item.value.toFixed(2)}</td>
                                    </div>
                                ))}
                            </tbody>
                        }
                    </table>
                </div>
            </section>

            <section className={styles.rightContainer}>
                <h2>Hist??rico do saldo</h2>

                {loader ? 
                    <div className={styles.loader}>
                        <Oval type="Oval" color="#000" height={30} width={30} />
                    </div>
                    :
                    <BarChart style={{marginTop: '1rem', marginLeft: 0, padding: 0}} width={isSmallMobile ? 350 : 500} height={400} data={data}>
                        <XAxis dataKey="name" stroke="#000" />
                        <YAxis />
                        <Tooltip content={<CustomTooltip />} />
                        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                        <Bar dataKey="uv" fill="#0028f3" barSize={25} />
                    </BarChart>
                }
            </section>
        </div>
    )
}