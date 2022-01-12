import React from 'react';

import { BsHouseDoor, BsTag } from 'react-icons/bs';
import { AiOutlinePieChart, AiOutlineShoppingCart, AiOutlineUnlock, AiOutlineCalendar } from 'react-icons/ai';
import { FiUsers, FiBarChart } from 'react-icons/fi';
import { IoMdPaper } from 'react-icons/io';
import { MdKeyboardArrowLeft } from 'react-icons/md';

import styles from './menu.module.scss';

export default function Menu () {
    return(
        <div className={styles.container}>
            <li className={styles.menuItem}>
                <BsHouseDoor size={30} color="#000" />
            </li>

            {/* <ul>
                <span className={styles.title}>Management</span>

                <li className={styles.menuItem}>
                    <AiOutlinePieChart size={20} color="#afb2b1" />
                    <span className={styles.itemName}>Analytics</span>
                    <div className={styles.arrow}>
                        <MdKeyboardArrowLeft size={20} color="#afb2b1" />
                    </div>
                </li>


                <li className={styles.menuItem}>
                    <FiUsers size={20} color="#afb2b1" />
                    <span className={styles.itemName}>Customers</span>
                </li>
                

                <li className={styles.menuItem}>
                    <AiOutlineShoppingCart size={20} color="#afb2b1" />
                    <span className={styles.itemName}>Orders</span>
                </li>


                <li className={styles.menuItem}>
                    <BsTag size={20} color="#afb2b1" />
                    <span className={styles.itemName}>Products</span>
                </li>


                <li className={styles.menuItem}>
                    <IoMdPaper size={20} color="#afb2b1" />
                    <span className={styles.itemName}>Invoices</span>
                </li>
            </ul>

            <ul>
                <span className={styles.title}>Pages</span>

                <li className={styles.menuItem}>
                    <AiOutlineUnlock size={20} color="#afb2b1" />
                    <span className={styles.itemName}>Authentication</span>
                    <div className={styles.arrow}>
                        <MdKeyboardArrowLeft size={20} color="#afb2b1" />
                    </div>
                </li>

                <li className={styles.menuItem}>
                    <AiOutlineCalendar size={20} color="#afb2b1" />
                    <span className={styles.itemName}>Calendar</span>
                </li>
            </ul>

            <ul>
                <span className={styles.title}>Components</span>
                <li className={styles.menuItem}>
                    <FiBarChart size={20} color="#afb2b1" />
                    <span className={styles.itemName}>Charts</span>
                </li>
            </ul> */}
        </div>
    )
}