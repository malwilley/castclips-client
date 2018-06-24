import * as React from 'react';
import './FeatureCard.css';
import Spinner from '~/components/Spinner/Spinner';
import { HttpRequest } from '~/types';

interface Props<T> {
  content: HttpRequest<T>;
  renderContent: (content: T) => JSX.Element;
}

const renderNotAsked = () => {
  return <div className="">Not asked</div>;
};

const renderLoading = () => {
  return (
    <div className="down-half">
      <Spinner />
    </div>
  );
};

const renderError = (message: string) => {
  return <div className="flex card p2 slide-in-fifty down-half">Error! {message}</div>;
};

function FeatureCard<T>(props: Props<T>) {
  switch (props.content.type) {
    case 'fetching':
      return renderLoading();
    case 'error':
      return renderError(props.content.message);
    case 'success':
      return props.renderContent(props.content.data);
    default:
      return renderNotAsked();
  }
}

export default FeatureCard;
