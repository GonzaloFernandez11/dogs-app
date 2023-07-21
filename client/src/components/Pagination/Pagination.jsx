import React from 'react';
import styles from './Pagination.module.css';

export default function Pagination({ breedsPerPage, allBreeds, maxPage, pag, currentPage, setCurrentPage }) {
    let pages = [];

    for( let i = 1; i <= Math.ceil(allBreeds / breedsPerPage); i++ ) {
    // Divido todas las breeds por la cantidad de breeds por página (8), redondeo el resultado hacia el entero mayor más cercano y pusheo;
        pages.push(i)
    }

    const prev = (e) => {
        e.preventDefault();
        setCurrentPage( currentPage - 1 );
    };

    const next = (e) => {
        e.preventDefault();
        setCurrentPage( currentPage + 1 );
    };


    return (
        <div className={styles.container}>
            <div className={styles.pag}>
            <nav className={styles.nav}>
                <ul className={styles.pag}>
                {pages && pages.map((num) => (
                    <button
                    key={num}
                    className={styles.buttonPage}
                    onClick={() => pag(num)}
                    >
                        {num}
                    </button>
                ))}
                </ul>
            </nav>
            {/* Fijarse después si necesita algún otro div rodeando el nav */}
            <button className={styles.botoncito} onClick={(e) => prev(e)} disabled={ currentPage === 1 }>Prev</button>
            <button className={styles.botoncito} onClick={(e) => next(e)} disabled={ currentPage === maxPage }>Next</button>
            </div>
        </div>
    )

}