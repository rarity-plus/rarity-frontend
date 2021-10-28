import { createContext, FC, useEffect, useRef, useState } from "react"

export const FAST_INTERVAL = 10000
export const SLOW_INTERVAL = 60000

export const RefreshContext = createContext({slow: 0, fast: 0})

export const useIsBrowserTabActive = () => {
    const isBrowserTabActiveRef = useRef(true)

    useEffect(() =>  {
        const onVisibilityChange = () => {
            isBrowserTabActiveRef.current = !document.hidden
        }
      
        window.addEventListener('visibilitychange', onVisibilityChange)
      
        return () => {
            window.removeEventListener('visibilitychange', onVisibilityChange)
        }
    }, [])

    return isBrowserTabActiveRef
}

export const RefreshContextProvider: FC = ({ children }) => {
    const [slow, setSlow] = useState(0)
    const [fast, setFast] = useState(0)
    const isBrowserTabActiveRef = useIsBrowserTabActive()
  
    useEffect(() => {
      const interval = setInterval(async () => {
        if (isBrowserTabActiveRef.current) {
          setFast((prev) => prev + 1)
        }
      }, FAST_INTERVAL)
      return () => clearInterval(interval)
    }, [isBrowserTabActiveRef])
  
    useEffect(() => {
      const interval = setInterval(async () => {
        if (isBrowserTabActiveRef.current) {
          setSlow((prev) => prev + 1)
        }
      }, SLOW_INTERVAL)
      return () => clearInterval(interval)
    }, [isBrowserTabActiveRef])
  
    return <RefreshContext.Provider value={{ slow, fast }}>{children}</RefreshContext.Provider>
  }