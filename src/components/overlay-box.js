import * as React from 'react'

const StyleInjector = ({className, children}) => {
  const StyledChildren = () =>
    React.Children.map(children, child =>
      React.cloneElement(child, {
        className: `${child.props.className} ${className}`
      })
    )
  return <StyledChildren/>
}

class OverlayBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false,
    }
  }

  render() {
    const {text, className, overlaidClassName, render} = this.props
    return (
      <div className="position-relative m-0 p-0">
        {this.state.show && (
          <div className="position-absolute w-100 h-100 d-flex align-items-center" style={{zIndex: 1}}>
            <div className={`w-100 text-center ${className}`}>{text}</div>
          </div>
        )}
        <StyleInjector className={this.state.show ? overlaidClassName : ''}>
          {render({show: this.onShow.bind(this), hide: this.onHide.bind(this)})}
        </StyleInjector>
      </div>
    )
  }

  onShow() {
    this.setState({show: true})
    if (this.props.timeout) {
      setTimeout(() => this.setState({show: false}), this.props.timeout)
    }
  }

  onHide() {
    this.setState({show: false})
  }
}

export default OverlayBox
