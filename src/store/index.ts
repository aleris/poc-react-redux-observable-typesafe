import { RootAction, RootState, Services } from 'typesafe-actions'
import { createStore, applyMiddleware } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import { composeWithDevTools } from 'redux-devtools-extension'

import rootReducer from './root-reducer'
import rootEpic from './root-epic'
import services from '../services'

export const epicMiddleware = createEpicMiddleware<
  RootAction,
  RootAction,
  RootState,
  Services
>({
  dependencies: services
})

const initialState = {}

const store = createStore(
  rootReducer(),
  initialState,
  composeWithDevTools(applyMiddleware(epicMiddleware))
)

epicMiddleware.run(rootEpic)

export default store
