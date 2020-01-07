import { useState } from 'react'

const useLocalStorage = <T extends object | string | number>(
  key: string,
  initialValue: T
): [T, (val: T) => void] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)

      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      return initialValue
    }
  })

  const setValue = (value: T) => {
    try {
      setStoredValue(value)

      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      // Eat error
    }
  }

  return [storedValue, setValue]
}

export default useLocalStorage
