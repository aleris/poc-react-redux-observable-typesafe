import * as React from 'react'

import DocumentView from '../components/DocumentView'
import styles from './App.module.css'

const App: React.FunctionComponent<{}> = () => {
  return (
    <div className={styles.app}>
      <header>
        <div className={styles.title}>Doc Cre Poc</div>
      </header>
      <section>
        <DocumentView id="abc-123-xzy-456" />
      </section>
      <footer></footer>
    </div>
  )
}

export default App
