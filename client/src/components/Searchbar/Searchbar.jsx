import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchByName } from '../../Redux/actions.js';
import styles from './Searchbar.module.css';


export default function Searchbar() {
    const dispatch = useDispatch();
    const [name, setName] = useState("");  

    const handleInputChange = (e) => {
        e.preventDefault();
        setName(e.target.value); 
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(searchByName(name));
    };

    return (
        <div className={styles.container}>
            <div className={styles.searchbar}>
                <input 
                className={styles.search}
                placeholder='Search a breed'
                type='search'
                value={name}
                onChange={(e) => handleInputChange(e)}
                />

                <div className={styles.boton}>
                    <button
                    className={styles.botoncito}
                    type='submit'
                    onClick={(e) => handleSubmit(e)} />
                </div>
            </div>
        </div>
    );

} 