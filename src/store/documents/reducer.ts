import { combineReducers } from 'redux'
import { createReducer } from 'typesafe-actions'
import { documentEventsMessageWasReceivedAction, getDocumentAction } from './actions'

const reducer = combineReducers({
  isLoading: createReducer(false)
    .handleAction([getDocumentAction.request], (state, action) => true)
    .handleAction(
      [getDocumentAction.success, getDocumentAction.failure],
      (state, action) => false
    ),
  document: createReducer({
    id: '',
    businessId: '',
    issueDateString: new Date().toISOString()
  }).handleAction(
    [getDocumentAction.success, documentEventsMessageWasReceivedAction],
    (state, action) => action.payload
  )
})

export default reducer
export type DocumentsState = ReturnType<typeof reducer>
