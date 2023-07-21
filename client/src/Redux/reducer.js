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


 // Fallas a resolver: 
 // Temperaments en el form.


const initialState = {
    breeds: [],
    breedsGlobal: [],
    breedsDetails: [],
    sorts_filters: [],
    temperaments: [],
    searchRecipes: [],

};


const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_BREEDS:
            return {
                ...state,
                breeds: action.payload,
                breedsGlobal: action.payload,
            };
        case GET_ALL_TEMPERAMENTS:
            return {
                ...state,
                temperaments: action.payload,
            };
        case RESET_FILTERS:
            return {
                ...state,
                breeds: state.breedsGlobal,
                sorts_filters: [],
            };
        case SEARCH_BY_NAME:
            return {
                ...state,
                searchRecipes: action.payload,
                breeds: action.payload,
            };
        case DETAIL_BREED:
            return {
                ...state,
                breedsDetails: action.payload,
            };
        case POST_NEW_BREED:
            return {
                ...state,
            };
        case CLEAR_BREED_DETAIL:
            return {
                ...state,
                breedsDetails: [],
            };
        case SORTS_AND_FILTERS:
            let allData = [...state.breeds];
            let filteredData = allData;
            const { temperamentFilter, originFilter, selectAlphOrder, selectWeightOrder } = action.payload;

            if( temperamentFilter !== 'Default' ) {
                filteredData = allData.filter((e) => e.temperaments && e.temperaments.includes(temperamentFilter));
            } 

            if( originFilter !== 'Default' ) {
                if( originFilter === 'DB' ) { //    id = 'ahjf87jefgv9' --> no es un número, id de la DB;
                    filteredData = filteredData.filter( e => isNaN(e.id) === true );
                } else if( originFilter === 'API' ){ //  id = '155' --> el operador 'isNaN' lo asume como número, id de la API;
                    filteredData = filteredData.filter( e => isNaN(e.id) === false );
                }
            }

            if( selectAlphOrder === 'A-Z' ) { // localeCompare permite comparar 2 strings y determinar may, min o igual (1, -1, 0)
                filteredData.sort((a, b) => a.name.localeCompare(b.name));
            } else if( selectAlphOrder === 'Z-A' ) {  // sort toma el resultado del localeCompare y ordena :)
                filteredData.sort((a, b) => b.name.localeCompare(a.name))
            } else if( selectAlphOrder === 'Default' ) {
                filteredData.sort((a, b) => a.name.localeCompare(b.name));
            };


            if( selectWeightOrder === 'Ascendent' ) {
                filteredData.sort((a, b) => {   // Del string matche los num con la regexp y los transformo en valores numéricos con el map.

                    const aWeightNumbers = a.weight === 'NaN' ? [0] : Array.isArray(a.weight) ? 
                    a.weight.join('').match(/\d+/g).map(Number) : a.weight.match(/\d+/g).map(Number);

                    const bWeightNumbers = b.weight === 'NaN' ? [0] : Array.isArray(b.weight) ? 
                    b.weight.join('').match(/\d+/g).map(Number) : b.weight.match(/\d+/g).map(Number);
                
                    const maxComp = Math.max(...aWeightNumbers) - Math.max(...bWeightNumbers); 

                    return maxComp !== 0 ? maxComp : Math.min(...aWeightNumbers) - Math.min(...bWeightNumbers);
                });

            } else if( selectWeightOrder === 'Descendent' ) {
                filteredData.sort((a, b) => {
                    const aWeightNumbers = a.weight === 'NaN' ? [0] : Array.isArray(a.weight) ? 
                    a.weight.join('').match(/\d+/g).map(Number) : a.weight.match(/\d+/g).map(Number)

                    const bWeightNumbers = b.weight === 'NaN' ? [0] : Array.isArray(b.weight) ? 
                    b.weight.join('').match(/\d+/g).map(Number) : b.weight.match(/\d+/g).map(Number);

                    // Comparo los máximos y, en caso de empate, comparo con los mínimos.
                    const maxComp = Math.max(...bWeightNumbers) - Math.max(...aWeightNumbers);

                    return maxComp !== 0 ? maxComp : Math.min(...bWeightNumbers) - Math.min(...aWeightNumbers);
                });
            } 

            return {
                ...state,
                sorts_filters: filteredData, 
                breeds: filteredData,
            }
    default:
        return state;
    };
};


export default rootReducer;