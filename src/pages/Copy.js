import {FaArrowRight, FaArrowDown} from 'react-icons/fa'
import Clipboard from 'react-clipboard.js'
import {Base64} from 'js-base64'
import pako from 'pako'
import Layout from '../components/layout'
import OverlayBox from '../components/overlay-box'
import NotFound from './NotFound'

const Copy = ({match}) => {
  try {
    const {base64} = match.params
    const text = decode(base64)
    const body = replaceNL(text)
    return (
      <Layout brand={(
        <p>Click a text box <FaArrowRight/> Text copied to your clipboard!</p>
      )}>
        {body && (
          <>
            <p><FaArrowDown/> Click! <FaArrowDown/></p>
            <OverlayBox text="copied!" timeout={1000} className="text-dark" overlaidClassName="overlaid"
                        render={({show}) => (
                          <Clipboard id="copy" component="div" className="card" data-clipboard-text={text}
                                     onSuccess={show}
                                     onError={() => alert('failed to copy!')}>
                            <div role="button" aria-label="copy a text" className="card-body">{body}</div>
                          </Clipboard>
                        )}/>
          </>
        )}
      </Layout>
    )
  } catch {
    return (<NotFound/>)
  }
}

export default Copy

function decode(b64) {
  const bin = Base64.toUint8Array(b64)
  const unzip = pako.inflate(bin, {level: 9})
  return new TextDecoder('utf-8').decode(unzip)
}

function replaceNL(text) {
  return (text || '').split('\n').map((l, i) => i === 0 ? (<>{l}</>) : (<><br/>{l}</>))
}
