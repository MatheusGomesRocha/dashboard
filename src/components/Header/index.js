import React, { useContext, useState } from 'react';

import { IoMenuSharp } from 'react-icons/io5';
import { CgBell } from 'react-icons/cg';
import { BiCog } from 'react-icons/bi';
import { MdKeyboardArrowRight } from 'react-icons/md';

import BrazilFlag from '../../assets/icons/brazil.png';     // Icons
import Logout from '../../assets/icons/logout.png';     // Icons
import Profile from '../../assets/images/profile.jpeg';     // Images

import { LoginContext } from '../../contexts/LoginContext';

import styles from './header.module.scss';

export default function Header () {
    const { userAccount, userName, userAvatar, logout } = useContext(LoginContext);

    const [hoverNotification, setHoverNotification] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(false);

    return(
        <div className={styles.container}>
            {/* <div className={styles.menuButton}>
                <IoMenuSharp color="#000" size={25} />
            </div> */}

            <h2>Conta bancária</h2>

            <section className={styles.rightArea}>
                {/* <div
                    onMouseOver={() => setHoverNotification(true)} 
                    onMouseOut={() => setHoverNotification(false)} 
                    className={styles.defaultButton}
                >
                    <CgBell color={hoverNotification ? '#000' : '#a4acb7'} size={25} />
                    <div className={styles.notificationIndicator} />
                </div> */}

                <div className={styles.flagIconButton}>
                    <img width={25} height={25} className={styles.icon} src={BrazilFlag} />
                </div>

                <div className={styles.profileButtonArea}>
                    <div onClick={() => setOpenDropdown(!openDropdown)} className={styles.profileButton}>
                        <span className={styles.userName}>{userName}</span>
                        
                        <div className={styles.arrowIcon}>
                            <MdKeyboardArrowRight color="#000" size={18} />
                        </div>
                    </div>

                    <div style={{display: openDropdown ? 'flex' : 'none'}} className={styles.dropdownMenu}>
                        <div className={styles.dropdownHeader}>
                            <img src={Profile} className={styles.profileImg} />
                            <span>{userAccount}</span>
                        </div>

                        <div onClick={logout} className={styles.dropdownItem}>
                            <img src={Logout} />
                            <span>Desconectar</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}