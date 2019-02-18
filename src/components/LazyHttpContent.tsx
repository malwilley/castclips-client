import { LazyLoadedData } from '~/types';

type LazyHttpContentProps<T> = {
  renderError?: (message: string) => React.ReactNode;
  renderFetching?: (data: T) => React.ReactNode;
  renderSuccess: (data: T) => React.ReactNode;
  request: LazyLoadedData<T>;
};

const LazyHttpContent = <T extends any>({
  request,
  renderError = () => null,
  renderFetching = () => null,
  renderSuccess,
}: LazyHttpContentProps<T>) => {
  switch (request.type) {
    case 'success':
      return renderSuccess(request.data);
    case 'error':
      return renderError(request.message);
    case 'fetching':
      return renderFetching(request.data);
    case 'not_asked':
    default:
      return null;
  }
};

export default LazyHttpContent;
