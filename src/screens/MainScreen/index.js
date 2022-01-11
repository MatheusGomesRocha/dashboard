import React, { useState } from 'react';
import Select from 'react-select';

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

export default function MainScreen () {
    const [selectOption, setSelectOption] = useState('hoje');

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
                        <h2>Transações</h2>

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
        </div>
    )
}