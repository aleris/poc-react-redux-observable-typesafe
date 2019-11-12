import { DocumentEdit, WebSocketConnectionParams } from './models'
import { createAsyncAction, createAction } from 'typesafe-actions'

export const getDocumentAction = createAsyncAction(
  'GET_DOCUMENT/REQUEST',
  'GET_DOCUMENT/SUCCESS',
  'GET_DOCUMENT/FAILURE',
  'GET_DOCUMENT/CANCEL'
)<string, DocumentEdit, Error, string>()

export const documentEventsDoConnectAction = createAction(
  'DOCUMENT_EVENTS/DO_CONNECT'
)<WebSocketConnectionParams>()

export const documentEventsWasConnectedAction = createAction(
  'DOCUMENT_EVENTS/WAS_CONNECTED'
)()

export const documentEventsMessageWasReceivedAction = createAction(
  'DOCUMENT_EVENTS/MESSAGE_WAS_RECEIVED'
)<DocumentEdit>()

export const documentEventsDoSendMessageAction = createAction(
  'DOCUMENT_EVENTS/DO_SEND_MESSAGE'
)<DocumentEdit>()

export const documentEventsMessageWasSentAction = createAction(
  'DOCUMENT_EVENTS/MESSAGE_WAS_SENT'
)<DocumentEdit>()

export const documentEventsDoDisconnectAction = createAction(
  'DOCUMENT_EVENTS/DO_DISCONNECT'
)()

export const documentEventsWasDisconnectedAction = createAction(
  'DOCUMENT_EVENTS/WAS_DISCONNECTED'
)<Error | null>()
