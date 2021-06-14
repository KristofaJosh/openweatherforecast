import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { siteStateReducer } from './reducers/siteState.reducer';

const store = createStore(siteStateReducer, composeWithDevTools());

// root state for redux
export type RootState = ReturnType<typeof siteStateReducer>;
export default store;
