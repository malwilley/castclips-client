import * as React from 'react'
import Spinner from 'components/Spinner/Spinner'
import { HttpRequest } from 'types'
import './FeatureCard.css'

type Props<T> = {
  content: HttpRequest<T>
  renderContent: (content: T) => JSX.Element
}

const renderLoading = () => {
  return (
    <div className="down-half">
      <Spinner />
    </div>
  )
}

const renderError = (message: string) => {
  return <div className="flex card p2 slide-in-fifty down-half">Error! {message}</div>
}

const FeatureCard = <T extends any>(props: Props<T>) => {
  switch (props.content.type) {
    case 'fetching':
      return renderLoading()
    case 'error':
      return renderError(props.content.message)
    case 'success':
      return props.renderContent(props.content.data)
    default:
      return null
  }
}

export default FeatureCard
