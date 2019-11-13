import { combineReducers } from 'redux'
import { createReducer } from 'typesafe-actions'
import { getDocument, webSocketConnect } from './actions'

const isLoading = createReducer(false)
  .handleAction([getDocument.request], () => true)
  .handleAction(
    [getDocument.success, getDocument.failure, getDocument.cancel],
    () => false
  )

const document = createReducer({
  id: '',
  businessId: '',
  issueDateString: new Date().toISOString()
}).handleAction(
  [getDocument.success],
  (_, action: ReturnType<typeof getDocument.success>) => action.payload
)

const isConnected = createReducer(false)
  .handleAction([webSocketConnect.success], () => true)
  .handleAction(
    [webSocketConnect.failure, webSocketConnect.cancel],
    () => false
  )

const documentsReducer = combineReducers({
  isLoading,
  document,
  isConnected
})

export default documentsReducer
