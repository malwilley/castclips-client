import * as React from 'react'

type Params = {
  isOpen: boolean
  toggle: () => void
}

type ShowProps = {
  children: (params: Params) => React.ReactNode
}

type ShowState = {
  isOpen: boolean
}

class Show extends React.Component<ShowProps, ShowState> {
  state = {
    isOpen: false,
  }

  toggle = () => {
    this.setState(({ isOpen }) => ({
      isOpen: !isOpen,
    }))
  }

  render() {
    const { children } = this.props
    const { isOpen } = this.state

    return children({ isOpen, toggle: this.toggle })
  }
}

export default Show
