// Después puedo probar crear 2 reducers y combinarlos, pero por ahora hagamoslo andar:


import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import rootReducer from './reducer.js';

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

export default store;   // Modificar en la importación (index.js);
