import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducer from './reducer.js';
const logger = store => next => (action) =>{
  console.log('estado actual',store.getState());
  console.log('accion', action);
  const result = next(action);
  console.log('estado nuevo',store.getState())
  return result;
}
const store = createStore(
   reducer,
   applyMiddleware(
     logger,
     thunk,
   ),
 );



export default store;
