import React from 'react';

import styles from './mainScreen.module.scss';

export default function MainScreen () {
    return(
        <div className={styles.container}>
            <section className={styles.leftContainer}>
                <h2>Overview</h2>

                <div className={styles.valueItem}>
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

            </section>
        </div>
    )
}