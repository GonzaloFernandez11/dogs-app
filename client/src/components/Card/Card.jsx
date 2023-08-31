import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Card.module.css';

export default function Card({ id, image, name, temperaments, weight }) {
    return (
        <div className={styles.container}>
            <Link to={`details/${id}`} className={styles.link}>
            <div className={styles.card}>
                <div className={styles.imgContainer}> {/* Container para la img */}
                    <img src={image} alt='notFound'/>

                    <div className={styles.nameContainer}> {/* Container para el name */}
                        <h2 className={styles.cardName}>{name}</h2>
                    </div>

                </div>

                <div className={styles.content}>
                    <div className={styles.tempsweight}>
                        <h4 className={styles.info}><b>Temperaments:</b> - {Array.isArray(temperaments) ? 
                        temperaments.join(', ') : temperaments} -</h4> 
                        <h4 className={styles.info}><b>Weight:</b> {weight} KG</h4>
                    </div>
                </div>

            </div>
            </Link>
        </div>
    )
}