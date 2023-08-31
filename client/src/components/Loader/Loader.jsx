import React from 'react';
import styles from './Loader.module.css';

const Loader = () => {
    return (
        <div className={styles.container}>
            <img src='https://i.pinimg.com/originals/c5/7f/5a/c57f5af94487bb62711c5adf7926feb2.gif' alt='Loading...' className={styles.loader}/>
        </div>
    )
}


export default Loader; 