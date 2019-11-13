import { RootState } from 'typesafe-actions'
import * as React from 'react'
import { connect } from 'react-redux'
import { DocumentEdit } from '../store/documents/models'
import * as selectors from '../store/documents/selectors'
import {
  getDocument,
  sendMessage,
  webSocketConnect
} from '../store/documents/actions'

type Props = {
  id: string

  getDocument: typeof getDocument.request
  isLoading: boolean
  document: DocumentEdit

  connect: typeof webSocketConnect.request
  send: typeof sendMessage.request
}

const mapDispatchToProps = {
  getDocument: getDocument.request,
  connect: webSocketConnect.request,
  send: sendMessage.request
}

const mapStateToProps = (state: RootState) => ({
  isLoading: selectors.isLoading(state),
  document: selectors.getDocument(state)
})

type State = {
  businessId: string
  document: DocumentEdit | null
}

class Document extends React.Component<Props, State> {
  readonly state = { businessId: '', document: null as DocumentEdit | null }

  handleGetClick = () => {
    this.props.getDocument(this.props.id)
  }

  handleBusinessIdChange: React.ReactEventHandler<HTMLInputElement> = ev => {
    this.setState({ businessId: ev.currentTarget.value })
  }

  handleSaveClick = () => {
    const { document } = this.state
    if (null !== document) {
      const { id } = this.props
      const { businessId } = this.state
      const { issueDateString } = document
      this.props.send({
        id,
        businessId,
        issueDateString
      })
    }
  }

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    if (nextProps.document !== prevState.document) {
      return {
        document: nextProps.document,
        businessId: nextProps.document.businessId
      }
    }
    return null
  }

  componentDidMount(): void {
    this.props.connect({ url: 'wss://echo.websocket.org' })
  }

  render() {
    const { id, isLoading, document } = this.props
    const { businessId } = this.state

    return (
      <form
        onSubmit={ev => {
          ev.preventDefault()
        }}
      >
        <button onClick={this.handleGetClick}>Get</button>
        {isLoading && <div>Loading...</div>}
        <div>ID: {id}</div>
        <div>
          Business ID:
          <input
            type="text"
            placeholder="Enter new business id"
            value={businessId}
            onChange={this.handleBusinessIdChange}
          />
        </div>
        <div>Issue Date: {document.issueDateString}</div>
        <div>
          <button
            type="submit"
            onClick={this.handleSaveClick}
            disabled={!businessId}
          >
            Save
          </button>
        </div>
      </form>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Document)
