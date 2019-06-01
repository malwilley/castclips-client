import { HttpRequest } from 'src/types';

type HttpContentProps<T> = {
  renderError?: (message: string) => JSX.Element | null;
  renderFetching?: () => JSX.Element | null;
  renderSuccess: (data: T) => JSX.Element | null;
  request: HttpRequest<T>;
};

const HttpContent = <T extends any>({
  request,
  renderError = () => null,
  renderFetching = () => null,
  renderSuccess,
}: HttpContentProps<T>) => {
  switch (request.type) {
    case 'success':
      return renderSuccess(request.data);
    case 'error':
      return renderError(request.message);
    case 'fetching':
      return renderFetching();
    case 'not_asked':
    default:
      return null;
  }
};

export default HttpContent;
