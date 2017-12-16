import meetupReducer from './meetupReducer/meetupReducer';
import eventfulReducer from './eventfulReducer/eventfulReducer';
import googlePlacesReducer from './googlePlacesReducer/googlePlacesReducer';

import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    meetupReducer, eventfulReducer, googlePlacesReducer
});

export default rootReducer;