import * as logger from './logger-service'
import * as documents from './documents-api'
import * as socket from './socket-service'

export default {
  logger,
  api: {
    documents,
    socket
  }
}
