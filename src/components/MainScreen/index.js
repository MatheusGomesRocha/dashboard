import React from 'react';

import styles from './mainScreen.module.scss';

export default function MainScreen () {
    return(
        <div className={styles.container}>
            <section className={styles.leftContainer}>
                <h2>Overview</h2>

                <div className={styles.valueArea}>
                    <div className={styles.valueItem}>
                        <p>Total Profit</p>
                        <div>
                            <span className={styles.value}>R$ 35.457</span>
                            <span className={styles.percent}>+ 4.85%</span>
                        </div>
                    </div>

                    <div className={styles.valueItem}>
                        <p>Total Expenses</p>
                        <div>
                            <span className={styles.value}>R$ 25.156</span>
                            <span className={styles.percent}>+ 4.85%</span>
                        </div>
                    </div>

                    <div className={styles.valueItem}>
                        <p>New Users</p>
                        <div>
                            <span className={styles.value}>2.841</span>
                            <span className={styles.percent}>- 4.85%</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}