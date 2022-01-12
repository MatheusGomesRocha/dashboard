import React, { useState } from 'react';
import Select from 'react-select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, getIntroOfPage, CartesianGrid } from 'recharts';

import styles from './mainScreen.module.scss';

const options = [
    { value: 'hoje', label: 'Hoje'},
    { value: 'ontem', label: 'Ontem'},
    { value: '3_dias', label: '3 dias'},
    { value: 'semana', label: 'Semana' },
    { value: 'mês', label: '1 Mês' },
    { value: '3_meses', label: '3 meses' },
    { value: 'ano', label: '1 Ano' },
];

const transactionArray = [
    {id: 1, type: 'Depósito', date: '12 Dez 2021', value: '14.05'},
    {id: 2, type: 'Saque', date: '12 Dez 2021', value: '14.05'},
    {id: 3, type: 'Saque', date: '12 Dez 2021', value: '14.05'},
    {id: 4, type: 'Depósito', date: '12 Dez 2021', value: '14.05'},
    {id: 5, type: 'Depósito', date: '12 Dez 2021', value: '14.05'},
    {id: 6, type: 'Saque', date: '12 Dez 2021', value: '14.05'},
    {id: 7, type: 'Saque', date: '12 Dez 2021', value: '14.05'},
    {id: 8, type: 'Saque', date: '12 Dez 2021', value: '14.05'},
    {id: 9, type: 'Saque', date: '12 Dez 2021', value: '14.05'},
    {id: 10, type: 'Saque', date: '12 Dez 2021', value: '14.05'},
    {id: 11, type: 'Saque', date: '12 Dez 2021', value: '14.05'},
];

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
    const [selectOption, setSelectOption] = useState('hoje');

    function CustomTooltip({ payload, label, active }) {
        if (active) {
          return (
            <div className={styles.customTooltip}>
              <p className="desc">R$ {payload[0].value}</p>
            </div>
          );
        }
      
        return null;
      }

    return(
        <div className={styles.container}>
            <section className={styles.leftContainer}>
                <h2>Overview</h2>

                <div className={styles.valueItem}>
                    <span className={styles.account}>Conta: <strong>20225687-9</strong></span>
                    <p>Saldo Total</p>
                    <div>
                        <span className={styles.value}>R$ 35.457,70</span>
                        <span className={styles.valueChange}>+ 3.55%</span>
                    </div>

                    <div className={styles.inlineButton}>
                        <div className={styles.depositButton}>
                            <span>Depositar dinheiro</span>
                        </div>

                        <div className={styles.withdrawButton}>
                            <span>Retirar dinheiro</span>
                        </div>
                    </div>
                </div>

                <div className={styles.historyArea}>
                    <div className={styles.header}>
                        <h2>Histórico de transações</h2>

                        <Select
                            options={options}
                            placeholder='Hoje'
                            defaultValue={selectOption}
                            onChange={v => setSelectOption(v)}
                        />
                    </div>

                    <table className={styles.transactionArea}>
                        {transactionArray.map((item, k) => (
                            <tbody key={k}>
                                <td style={{color: item.type === 'Saque' ? '#CA0808' : '#548C1D'}} className={styles.type}>{item.type}</td>
                                <td className={styles.date}>{item.date}</td>
                                <td style={{color: item.type === 'Saque' ? '#CA0808' : '#548C1D'}} className={styles.value}>{item.type === 'Saque' ? '-' : '+'} {item.value}</td>
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