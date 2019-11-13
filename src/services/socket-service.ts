import { webSocket, WebSocketSubject } from 'rxjs/webSocket'
import {
  DocumentEdit,
  WebSocketConnectionParams
} from '../store/documents/models'
import { Subject } from 'rxjs'

export const onOpen$ = new Subject<Event>()
export const onClose$ = new Subject<CloseEvent>()

export let webSocket$: WebSocketSubject<DocumentEdit>

export function connect(webSocketConnectionParams: WebSocketConnectionParams) {
  webSocket$ = webSocket<DocumentEdit>({
    url: webSocketConnectionParams.url,
    openObserver: onOpen$,
    closeObserver: onClose$
  })

  setTimeout(() => {
    webSocket$.next({
      id: '999',
      businessId: 'ORD-123-456-789',
      issueDateString: new Date().toISOString()
    })
  }, 5000)

  webSocket$.subscribe()
}
