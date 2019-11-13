import { combineEpics } from 'redux-observable';

import * as documentsEpics from './documents/epics'

export default combineEpics(...Object.values(documentsEpics))
