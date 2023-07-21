import React from 'react';
import Card from '../Card/Card';
import styles from './Cards.module.css'

export default function Cards({ breeds }) {

    return (
        // <div className={styles.container}>
            <div className={styles.cards}>
            {breeds && breeds.map( (b) => (
                    <Card 
                    key={b.id}
                    id={b.id}
                    image={b.image}
                    name={b.name}
                    temperaments={b.temperaments}
                    weight={b.weight}
                    />
                ) )}
            </div>
        // </div>
    )
}