import { combineReducers } from 'redux'

import documentsReducer from './documents/reducer'

const rootReducer = combineReducers({
  documents: documentsReducer
})

export default rootReducer
