import axios from 'axios';
import { 
    GET_ALL_BREEDS, 
    GET_ALL_TEMPERAMENTS, 
    SEARCH_BY_NAME, 
    DETAIL_BREED, 
    SORTS_AND_FILTERS, 
    POST_NEW_BREED, 
    RESET_FILTERS,
    CLEAR_BREED_DETAIL
 } from './actionTypes.js';


export const getBreeds = () => {
    return async( dispatch ) => {
        try {  
            const allBreeds = await axios.get('/breeds'); // Nos traemos todas las breeds;
            return dispatch({  // Hacemos el dispatch con la data que nos traemos con axios;
                type: GET_ALL_BREEDS,
                payload: allBreeds.data,
            });
        } catch (error) {
            console.log(error.response.data);
        }
    };
};


export const getTemperaments = () => {
    return async( dispatch ) => {
            const allTemperaments = await axios.get('/temperaments');
            return dispatch({
                type: GET_ALL_TEMPERAMENTS,
                payload: allTemperaments.data,
            });
    };
};


export const searchByName = (name) => {
    return async( dispatch ) => {
        try {
            const breedName = await axios.get(`/breeds?name=${name}`);
            return dispatch({
                type: SEARCH_BY_NAME,
                payload: breedName.data,
            });
        } catch (error) {
            const all = await axios.get('/breeds'); // Si el nombre no coincide, mostramos todas las breeds;
            return dispatch({
                type: SEARCH_BY_NAME,
                payload: all.data,
            });
        };
    };
};


export const getByID = (id) => {
    return async( dispatch ) => {
        try {            
            const breedID = await axios.get(`/breeds/${id}`);
            return dispatch({
                type: DETAIL_BREED,
                payload: breedID.data,
            });
        } catch (error) {
            console.log(error.response.data)
        }
    };
};


export const postBreed = (newBreeds) => {
    return async( dispatch ) => {
        const newBreed = await axios.post('/breeds', newBreeds);
        return dispatch({
            type: POST_NEW_BREED,
            payload: newBreed.data,
        });
    };
};


export const clearBreedDetail = (payload) => {
    return {
        type: CLEAR_BREED_DETAIL,
        payload,
    };
};


export const sortsAndFilters = (temperamentFilter, originFilter, selectAlphOrder, selectWeightOrder) => {
    return {
        type: SORTS_AND_FILTERS,
        payload: { 
            temperamentFilter, 
            originFilter, 
            selectAlphOrder, 
            selectWeightOrder 
        }
    };
}; 


export const resetFilters = () => {
    return {
        type: RESET_FILTERS,
    };
};