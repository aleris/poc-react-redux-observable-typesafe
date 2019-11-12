import { RootAction, RootState, isActionOf, Services } from 'typesafe-actions'
import { catchError, filter, map, mergeMap, switchMap } from 'rxjs/operators'
import { from, of } from 'rxjs'
import {
  documentEventsMessageWasSentAction,
  documentEventsMessageWasReceivedAction,
  documentEventsDoSendMessageAction,
  documentEventsDoConnectAction,
  getDocumentAction,
  documentEventsWasDisconnectedAction
} from './actions'
import { Epic } from 'redux-observable'

export const getDocumentEpic: Epic<
  RootAction,
  RootAction,
  RootState,
  Services
> = (action$, state$, { api }) =>
  action$.pipe(
    filter(isActionOf(getDocumentAction.request)),
    switchMap(action =>
      from(api.documents.get(action.payload)).pipe(
        map(getDocumentAction.success),
        catchError(err => of(getDocumentAction.failure(new Error(err))))
      )
    )
  )

export const documentEventsConnectEpic: Epic<
  RootAction,
  RootAction,
  RootState,
  Services
> = (action$, state$, { api }) =>
  action$.pipe(
    filter(isActionOf(documentEventsDoConnectAction)),
    mergeMap(action =>
      from(api.socket.connect(action.payload)).pipe(
        map(documentEventsMessageWasReceivedAction),
        catchError(err =>
          of(documentEventsWasDisconnectedAction(new Error(err)))
        )
      )
    )
  )

export const documentEventsSendMessageEpic: Epic<
  RootAction,
  RootAction,
  RootState,
  Services
> = (action$, state$, { api }) =>
  action$.pipe(
    filter(isActionOf(documentEventsDoSendMessageAction)),
    map(action => {
      api.socket.webSocket$.next(action.payload)
      return documentEventsMessageWasSentAction(action.payload)
    })
  )
