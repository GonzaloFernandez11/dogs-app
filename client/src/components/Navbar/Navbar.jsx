import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Searchbar from '../Searchbar/Searchbar';
import styles from './Navbar.module.css';
import DogIcon from '../../image/DogIcon.png';

export default function Navbar() {


    return (
        <div className={styles.container}>
            <div className={styles.navbar}>
                <div className={styles.icon}>
                    <Link to={'/home'}>
                        <img src={DogIcon} alt=''/> 
                    </Link>
                </div>

                <div className={styles.create}>
                    <Link to={'/create'}>
                        <button className={styles.botonboton}>Create</button>
                    </Link>
                </div>

                <div className={styles.logOut}>
                    <Link to={'/'}>
                        <button className={styles.botonboton}>Log Out</button>
                    </Link>
                </div>

                <div className={styles.searchbar}>
                    <Searchbar />
                </div>
            </div>
        </div>
    )
}