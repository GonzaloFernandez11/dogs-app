import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postBreed, getTemperaments } from '../../Redux/actions.js';
import { useHistory } from 'react-router-dom';
import validate from './validate.js';
import styles from './Form.module.css';


export default function Form() {

    const [selectedTemperaments, setSelectedTemperaments] = useState([]);

    const temps = useSelector((state) => state.temperaments);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(getTemperaments());
    }, [dispatch]);



    const [form, setForm] = useState({
        name: '.',
        image: '.',
        min_height: '.',
        max_height: '.',
        min_weight: '.',
        max_weight: '.',
        min_life: '.',
        max_life: '.',
    });

    const [errors, setErrors] = useState({
        name: '.',
        image: '.',
        min_height: '.',
        max_height: '.',
        min_weight: '.',
        max_weight: '.',
        min_life: '.',
        max_life: '.',
    });



    function handleInputChange(name, value) {
        if( isNaN(parseInt(value)) ) {
            setForm({ ...form, [name]: value });  // Si no es un num, se trata de un nombre o una url.
          } 
          else {
            const parsedValue = value === '' ? null : parseInt(value);
            ( setForm({ ...form, [name]: parsedValue }) ); // Si es un num, entonces lo pasamos a entero y lo guardamos.
        }
        setErrors(
            validate({  // Validamos los errores, si hay alguno, se muestran en pantalla
                ...form,
                [name]: [value]
            })
        )
    };


    function handleSelectTemp(opt) {
        const isAlreadySelected = selectedTemperaments.includes(opt);  // Para saber si ya existe en el estado local.
      
        if (!isAlreadySelected) {
          setSelectedTemperaments([...selectedTemperaments, opt]);  // si no existe ya, lo sumamos.
        }
      }


      function handleDeleteTemperament(index) {
        const updatedTemperaments = [...selectedTemperaments];  // para no modificar el estado directamente.
        updatedTemperaments.splice(index, 1);  // index = posicion a modificar / 1 = cantidad de elementos a modificar desde ese indice.
        setSelectedTemperaments(updatedTemperaments);
      }

    // console.log(selectedTemperaments)



    function createBreed(e) {  // Si todo está correcto, creamos la nueva breed con la action 'postbreed' y redirigimos al home.
        e.preventDefault();

        const newBreed = {
            name: form.name,
            image: form.image,
            min_height: form.min_height,
            max_height: form.max_height,
            min_weight: form.min_weight,
            max_weight: form.max_weight,
            min_life: form.min_life,
            max_life: form.max_life,
            temperaments: selectedTemperaments,
        }
        console.log(newBreed)
        dispatch(postBreed(newBreed));
        history.push('/home');
    }

    const temperaments = [...temps].sort((a, b) => a.name.localeCompare(b.name));

    return (

        <div className={styles.containerForm}>
            <form className={styles.form}>
                <div className={styles.inputContainer}>
                    <label>Name:</label>
                    <input 
                    placeholder='Write a breed name.'
                    required
                    onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                    name='name'
                    type='text'
                    />
                    { errors.name ? (
                        <span style={{color: 'red'}}>{errors.name}</span>
                    ) : null }
                </div>
                <hr />

                <div className={styles.inputContainer}>
                    <label>Image:</label>
                    <input 
                    placeholder='Insert your image URL.'
                    onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                    name='image'
                    type='text'
                    />
                    { errors.image ? (
                        <span style={{color: 'red'}}>{errors.image}</span>
                    ) : null }
                </div>
                <hr />

                <div className={styles.inputContainer}>
                    <label>Height:</label>
                  <div className={styles.flexInput}>
                      <input 
                      placeholder='Insert a Min Height.'
                      required
                      onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                      name='min_height'
                      type='number'
                      min='1'
                      />

                      <input
                      placeholder='Insert a Max Height.'
                      required
                      onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                      name='max_height'
                      type='number'
                      min='1'
                      />
                  </div>
                     <span style={{color: 'red'}}>{errors.min_height}</span>
                     <span style={{color: 'red'}}>{errors.max_height}</span>
                </div>
                <hr />

                <div className={styles.inputContainer}>
                    <label>Weight:</label>
                    <div className={styles.flexInput}>
                        <input 
                        placeholder='Insert a Min Weight.'
                        required
                        onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                        type='number'
                        name='min_weight'
                        />

                        <input 
                        placeholder='Insert a Max Weight.'
                        required
                        onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                        type='number'
                        name='max_weight'
                        />
                    </div>
                    <span style={{color: 'red'}}>{errors.min_weight}</span>
                    <span style={{color: 'red'}}>{errors.max_weight}</span>
                </div>
                <hr />

                
                <div className={styles.inputContainer}>
                    <label>Life Span:</label>
                    <div className={styles.flexInput}>
                        <input 
                        placeholder='Insert a Min Life.'
                        required
                        onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                        name='min_life'
                        type='number'
                        />

                        <input 
                        placeholder='Insert a Max Life.'
                        required
                        onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                        name='max_life'
                        type='number'
                        />
                    </div>
                    <span style={{color: 'red'}}>{errors.min_life}</span>
                    <span style={{color: 'red'}}>{errors.max_life}</span>
                </div>
                <hr />

                <div className={styles.selectBox}>
                    <select
                    defaultValue={'Default'}
                    required
                    onChange={(e) => handleSelectTemp(e.target.value)}
                    >
                        <option disabled value={'Default'}>Temperaments</option>
                        { temperaments && temperaments.map((opt) => {
                            return (
                                <option value={opt.name} key={opt.id}>
                                    {opt.name}
                                </option>
                            );
                        }) }
                    </select>
                </div>

                <div className={styles.list}>
                    <ul className={styles.listUl}>
                        { selectedTemperaments.map((opt, index) => (
                            <div key={index}>
                                <li className={styles.listLi}>
                                    {opt}
                                    <button className={styles.listButtonTemp}
                                    onClick={() => handleDeleteTemperament(index)}>
                                        X
                                    </button>
                                </li>
                            </div>
                        )) }
                    </ul>
                </div>

                <input 
                className={styles.sendButton}
                disabled={ // osea, deshabilitado si...
                    Object.entries(errors).length !== 0 ||  
                    form.name === '.' ||
                    form.min_height === '.' ||  
                    form.max_height === '.' ||
                    form.min_weight === '.' ||
                    form.max_weight === '.' ||
                    form.min_life === '.' ||
                    form.max_life === '.' ||
                    selectedTemperaments.length === 0
                }
                onClick={(e) => createBreed(e)}
                type='submit'
                value='Create'
                />
            </form>
        </div>
    )

}
