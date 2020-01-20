import { HttpRequest } from 'types'

const extractSuccessData = <T>(item: HttpRequest<T>) => (item.type === 'success' ? item.data : null)

export default extractSuccessData
