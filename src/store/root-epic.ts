import { combineEpics } from 'redux-observable';

import * as articles from './documents/epics'

export default combineEpics(...Object.values(articles))
