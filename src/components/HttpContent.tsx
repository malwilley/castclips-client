import { HttpRequest } from '~/types';

type HttpContentProps<T> = {
  renderError: (message: string) => JSX.Element;
  renderFetching: () => JSX.Element;
  renderSuccess: (data: T) => JSX.Element;
  request: HttpRequest<T>;
};

const HttpContent = <T extends object | number | string>({
  request,
  renderError,
  renderFetching,
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
