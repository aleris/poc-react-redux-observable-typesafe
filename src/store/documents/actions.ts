import { createAsyncAction } from 'typesafe-actions'
import { DocumentEdit, WebSocketConnectionParams } from './models'

export const getDocument = createAsyncAction(
  'getDocument.request',
  'getDocument.success',
  'getDocument.failure',
  'getDocument.cancel'
)<string, DocumentEdit, Error, undefined>()

export const webSocketConnect = createAsyncAction(
  'webSocketConnect.request',
  'webSocketConnect.success',
  'webSocketConnect.failure',
  'webSocketConnect.cancel'
)<WebSocketConnectionParams, undefined, Error, undefined>()

export const sendMessage = createAsyncAction(
  'sendMessage.request',
  'sendMessage.success',
  'sendMessage.failure'
)<DocumentEdit, undefined, Error, undefined>()

export const receiveMessage = createAsyncAction(
  'receiveMessage.request',
  'receiveMessage.success',
  'receiveMessage.failure'
)<undefined, DocumentEdit, Error, undefined>()
