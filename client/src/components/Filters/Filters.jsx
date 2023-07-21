import { sortsAndFilters, getTemperaments, resetFilters } from '../../Redux/actions.js';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import styles from './Filters.module.css'

export default function Filters() {
    const temps = useSelector((state) => state.temperaments);
    const [temperamentFilter, setTempFilter] = useState('Default');
    const [originFilter, setOriginFilter] = useState('Default');
    const [selectAlphOrder, setAlphOrder] = useState('Default');
    const [selectWeightOrder, setWeightOrder] = useState('Default');
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTemperaments());  // Para tener todos los temperaments y no hardcodear :)
    }, [dispatch]);

    const handleClick = (e) => {
        e.preventDefault();

        if( e.target.name === 'tempFilter' ) {
            setTempFilter(e.target.value);
            dispatch(resetFilters()) // llamo para resetear el filtrado :)
        }
        if( e.target.name === 'originFilter' ) {
            setOriginFilter(e.target.value);
            dispatch(resetFilters());
        }
        if( e.target.name === 'alphOrder' ) {
            setAlphOrder(e.target.value);
        }
        if( e.target.name === 'weightOrder' ) {
            setWeightOrder(e.target.value);
        }
    }

    useEffect(() => {
        dispatch(sortsAndFilters(temperamentFilter, originFilter, selectAlphOrder, selectWeightOrder));
    }, [dispatch, temperamentFilter, originFilter, selectAlphOrder, selectWeightOrder]);


    const sortedTemps = [...temps].sort((a, b) => a.name.localeCompare(b.name));
    
    return (
        <div className={styles.filtersContainer}>
            <div className={styles.selectBox}>
                {/* Filtrar por temperamentos:  */}
                <h3>Filter by Temperaments:</h3>
                <select
                name='tempFilter'
                defaultValue={'Default'}
                className={styles.selects}
                onChange={(e) => handleClick(e)}>
                    <option disabled value={'Default'}>
                        Filter Temperaments
                    </option>
                    <option value="Default">Default</option>
                    {sortedTemps && sortedTemps.map((t) => {
                        return (
                            <option value={t.name} key={t.id}>
                                {t.name}
                            </option>
                        );
                    })};
                </select>
            </div>

            <div className={styles.selectBox}>
                {/* Filtrar por origen: */}
                <h3>Filter by Origin:</h3>
                <select
                name='originFilter'
                defaultValue={'Default'}
                className={styles.selects}
                onChange={(e) => handleClick(e)}>
                    <option disabled value={'Default'}>
                        Filter Origin
                    </option>
                    <option value="API">API</option>
                    <option value="DB">DB</option>
                    <option value="Default">Default</option>
                </select>
            </div>

            <div className={styles.selectBox}>
                {/* Ordenar por alfabeto: */}
                <h3>Alphabetical Order:</h3>
                <select
                name='alphOrder'
                defaultValue={'Default'}
                className={styles.selects}
                onChange={(e) => handleClick(e)}>
                    <option disabled value={'Default'}>
                        Alphabetical Order
                    </option>
                    <option value="Default">Default</option>
                    <option value="A-Z">A-Z</option>
                    <option value="Z-A">Z-A</option>
                </select>
            </div>

            <div className={styles.selectBox}>
                {/* Ordenar por peso: */}
                <h3>Order By Weight:</h3>
                <select
                name='weightOrder'
                defaultValue={'Default'}
                className={styles.selects}
                onChange={(e) => handleClick(e)}>
                    <option disabled value={'Default'}>
                        Weight order
                    </option>
                    <option value="Default">Default</option>
                    <option value="Ascendent">Ascendent</option>
                    <option value="Descendent">Descendent</option>
                </select>
            </div>
        </div>
    )
}