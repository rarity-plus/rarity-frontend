import { useEffect } from "react"
import useRefresh from "./useRefresh"

const useGoldBalance = () => {
    const {fastRefresh} = useRefresh()

    useEffect(() => {

    }, [])

    useEffect(() => {

    }, [fastRefresh])
}

export default useGoldBalance