import {Component} from 'react'
import {Row, Col, FormControl} from 'react-bootstrap'
import Clipboard from 'react-clipboard.js'
import {Base64} from 'js-base64'
import pako from 'pako'
import Layout from '../components/layout'
import OverlayBox from '../components/overlay-box'

class Create extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      hideCopied: null,
    }
  }

  render() {
    const {text} = this.state
    const url = `${window.location.protocol}//${window.location.host}/${encode(text)}`
    return (
      <Layout main brand={(
        <p>We create a link for your text, so that everyone can copy the text to their clipboard super easily!</p>
      )}>
        <Row>
          <Col>
            <FormControl as="textarea" rows={5} style={{resize: 'none'}} onChange={e => {
              this.setState({text: e.target.value})
              this.state.hideCopied()
            }}/>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <OverlayBox text="copied!" className="text-dark" overlaidClassName="overlaid" render={({show, hide}) => (
              <Clipboard id="copy" component="div" className={`btn btn-primary ${text ? '' : 'disabled'}`}
                         data-clipboard-text={url}
                         onSuccess={() => this.onCopied(show, hide)}
                         onError={() => alert('failed to copy!')}>
                <div role={text ? '' : 'button'}>Create a Link!</div>
              </Clipboard>
            )}/>
          </Col>
        </Row>
      </Layout>
    )
  }

  onCopied(show, hide) {
    if (!this.state.hide) {
      this.setState({hideCopied: hide})
    }
    show()
  }
}

function encode(text) {
  try {
    const bin = new TextEncoder().encode(text)
    const zip = pako.deflate(bin, {level: 9})
    return Base64.fromUint8Array(zip, true)
  } catch (e) {
    console.log(e)
  }
}

export default Create
