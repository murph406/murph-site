import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';

class ScrollToTop extends PureComponent {

  componentDidUpdate(prevProps) {
    let { location } = this.props

    if (location !== prevProps.location) {
      window.scrollTo(0, 0)
    }
  }

  render() {
    let { children } = this.props
    
    return children
  }
}

export default withRouter(ScrollToTop)