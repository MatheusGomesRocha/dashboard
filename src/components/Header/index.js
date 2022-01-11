import React, { useState } from 'react';

import { IoMenuSharp } from 'react-icons/io5';
import { CgBell } from 'react-icons/cg';
import { BiCog } from 'react-icons/bi';
import { MdKeyboardArrowRight } from 'react-icons/md';

import BrazilFlag from '../../assets/icons/brazil.png';     // Icons
import Profile from '../../assets/images/profile.jpeg';     // Images

import styles from './header.module.scss';

export default function Header () {
    const [hoverNotification, setHoverNotification] = useState(false);
    const [hoverConfig, setHoverConfig] = useState(false);

    return(
        <div className={styles.container}>
            <div className={styles.menuButton}>
                <IoMenuSharp color="#000" size={25} />
            </div>

            <section className={styles.rightArea}>
                <div
                    onMouseOver={() => setHoverNotification(true)} 
                    onMouseOut={() => setHoverNotification(false)} 
                    className={styles.defaultButton}
                >
                    <CgBell color={hoverNotification ? '#000' : '#a4acb7'} size={25} />
                    <div className={styles.notificationIndicator} />
                </div>

                <div className={styles.flagIconButton}>
                    <img width={25} height={25} className={styles.icon} src={BrazilFlag} />
                </div>

                <div className={styles.profileButton}>
                    <span>Matheus Gomes</span>
                    
                    <div className={styles.arrowIcon}>
                        <MdKeyboardArrowRight color="#000" size={18} />
                    </div>
                </div>
            </section>
        </div>
    )
}