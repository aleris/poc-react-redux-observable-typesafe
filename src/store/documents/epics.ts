import { RootEpic, isActionOf } from 'typesafe-actions'
import { catchError, filter, map, switchMap, takeUntil } from 'rxjs/operators'
import { from, of } from 'rxjs'
import {
  getDocument,
  receiveMessage,
  sendMessage,
  webSocketConnect
} from './actions'

export const getDocumentEpic: RootEpic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(getDocument.request)),
    switchMap(action =>
      from(api.documents.get(action.payload)).pipe(
        map(getDocument.success),
        catchError(err => of(getDocument.failure(new Error(err)))),
        takeUntil(action$.pipe(filter(isActionOf(getDocument.cancel))))
      )
    )
  )

export const webSocketConnectEpic: RootEpic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(webSocketConnect.request)),
    switchMap(action => {
      api.socket.connect(action.payload)
      return api.socket.onOpen$.pipe(
        map(webSocketConnect.success),
        catchError(err => of(webSocketConnect.failure(new Error(err))))
      )
    })
  )

export const receiveMessageEpic: RootEpic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(webSocketConnect.success)),
    switchMap(() =>
      from(api.socket.webSocket$).pipe(
        map(receiveMessage.success),
        catchError(err => of(receiveMessage.failure(new Error(err))))
      )
    )
  )

export const sendMessageEpic: RootEpic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(sendMessage.request)),
    map(action => {
      api.socket.webSocket$.next(action.payload)
      return sendMessage.success()
    })
  )
