import { useEffect } from 'react'

type UseTitleOptions = Partial<{
  suffix: boolean
  when: boolean
}>

const useTitle = (title: Maybe<string>, { suffix = true, when = true }: UseTitleOptions = {}) => {
  useEffect(() => {
    if (when && title) {
      document.title = suffix ? `${title} - CastClips` : title
    }
  }, [suffix, title, when])
}

export default useTitle
