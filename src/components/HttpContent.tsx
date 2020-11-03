import { HttpRequest } from 'types'

type HttpContentProps<TData> = {
  renderError?: (message: string) => ReturnType<React.FC>
  renderFetching?: () => ReturnType<React.FC>
  renderSuccess: (data: TData) => ReturnType<React.FC>
  request: HttpRequest<TData>
}

const defaultRenderNothing = () => null

const HttpContent = <TData extends any>({
  request,
  renderError = defaultRenderNothing,
  renderFetching = defaultRenderNothing,
  renderSuccess,
}: HttpContentProps<TData>): ReturnType<React.FC> => {
  switch (request.type) {
    case 'success':
      return renderSuccess(request.data)
    case 'error':
      return renderError(request.message)
    case 'fetching':
      return renderFetching()
    default:
      return null
  }
}

export default HttpContent
