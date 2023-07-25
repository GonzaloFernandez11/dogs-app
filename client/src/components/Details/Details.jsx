import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getByID, clearBreedDetail } from '../../Redux/actions';
import styles from './Details.module.css';


export default function Details() {

    const dispatch = useDispatch();
    const { id } = useParams();

    const details = useSelector((state) => state.breedsDetails);

    useEffect(() => {
        dispatch( getByID(id) );
        return () => dispatch(clearBreedDetail());  // Cuando el componente se desmonte
    }, [dispatch, id]);


// console.log(details);


    return (
        <div className={styles.detailsContainer}>
            { details.length > 0 ? ( 
                <div className={styles.card}>
                    <div className={styles.imageContainer}>
                        <img src={details[0].image} alt='' className={styles.breedImage}/>
                    </div>

                    <div className={styles.content}>

                        <h1>{details[0].name}</h1>

                        <label className={styles.labelInfo}>Life Span:</label>
                        <h2>{details[0].life_span}</h2>

                        <label className={styles.labelInfo}>Weight:</label>
                        <h2>{details[0].weight} Kg</h2>

                        <label className={styles.labelInfo}>Height:</label>
                        <h2>{details[0].height} Cm</h2>

                        <label className={styles.labelInfo}>Temperaments:</label>
                        <h2>
                        {Array.isArray(details[0].temperaments)
                        ? details[0].temperaments.join(', ')
                        : details[0].temperaments}
                        </h2>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}