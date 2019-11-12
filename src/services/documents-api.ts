import { DocumentEdit } from '../store/documents/models'

const TIMEOUT = 500

export function get(id: string): Promise<DocumentEdit> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        id,
        businessId: 'INV-1',
        issueDateString: new Date(2019, 11, 1, 15, 20, 35, 400).toISOString()
      })
    }, TIMEOUT)
  })
}
