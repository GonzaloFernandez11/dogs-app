import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBreeds, sortsAndFilters, resetFilters } from '../../Redux/actions.js';
import Cards from '../Cards/Cards.jsx';
import Filters from '../Filters/Filters.jsx';
import Pagination from '../Pagination/Pagination.jsx';
import Loader from '../Loader/Loader.jsx';
import styles from './Home.module.css';


export default function Home() {

    const dispatch = useDispatch();
    const allBreeds = useSelector(state => state.breeds ); // Pasarle el length a Pagination
    const [temperamentFilter, setTempFilter] = useState('Default');

    // console.log(breeds.precio)

    const [currentPage, setCurrentPage] = useState(1) // La página actual y su función setteadora; pasarlos a Pagination
    const breedsPerPage = 8;
    const [maxPage, setMaxPage] = useState(0);  // Pasar maxPage a Pagination 
    const [breeds, setBreeds] = useState([]);  // Pasarle breeds a Cards

    useEffect(() => {
        dispatch(getBreeds())
    }, [dispatch]);


    const calculateBreedsPerPage = (breeds) => {
        const firstIndex = (currentPage -1) * breedsPerPage; // (1 - 1) * 8 = 0 --> primer firstIndex;
        const lastIndex = firstIndex + breedsPerPage; // 0 + 8 = 8 --> primer lastIndex; habría 9 elementos, debo renderizar 8 (0, 7).

        return breeds.slice(firstIndex, lastIndex); // slice, corta los resultados incluyendo el primer número, pero excluye el último.
    };  // breeds.slice( 0, 8 ) --> breeds = [0, 1, 2, 3, 4, 5, 6, 7] / 8 queda afuera.

    
    useEffect(() => {
        setBreeds(calculateBreedsPerPage(allBreeds));
        setMaxPage( Math.ceil(allBreeds.length / breedsPerPage) );
    }, [allBreeds, currentPage, breedsPerPage]);


    const pag = (pageNum) => { // Pasar a pagination.
        setCurrentPage(pageNum);
    };

    const handleClick = (e) => {
        e.preventDefault();

        if( e.target.name === 'tempFilter' ) {  // Cada vez que haya un cambio se resetea el filter sorts_filters
            setTempFilter(e.target.value);
            dispatch(resetFilters()) // llamo para resetear el filtrado :)
        }
    }

    useEffect(() => {  // Cuando se monta el componente o cuando se actualizan estos estados.
        dispatch(sortsAndFilters(temperamentFilter));
    }, [dispatch, temperamentFilter]);

    // El renderizado :)
    return (
        <div className={styles.container}>
            { allBreeds.length > 0 ? (
            <div className={styles.box}>

                <div className={styles.filters}>
                    <Filters />
                </div>

                <div className={styles.reload}>
                    <button name='tempFilter' onClick={(e) => handleClick(e)}>Reload</button>
                </div>

<hr></hr> {/* Dejo este hr para ver bien como aplicar la separación y los estilos */}

                <div className={styles.pagination}>
                    <Pagination 
                    breedsPerPage={breedsPerPage}
                    allBreeds={allBreeds.length}
                    maxPage={maxPage}
                    pag={pag}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    />
                </div>

<hr></hr> {/* Dejo este hr para ver bien como aplicar la separación y los estilos */}
                
                <div className={styles.cards}>
                    {console.log(breeds)}
                    <Cards 
                    breeds={breeds}/>
                </div>

            </div>
            ) : ( 
            <Loader></Loader>
            ) }
        </div>
    )

}