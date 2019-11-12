import { RootState } from 'typesafe-actions'

export const isLoading = (state: RootState) => state.documents.isLoading
export const getDocument = (state: RootState) => state.documents.document
