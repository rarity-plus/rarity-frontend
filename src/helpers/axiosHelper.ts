import axios from 'axios';


export const Wait = (delay: number) => {
    return new Promise((resolve) => setTimeout(resolve, delay));
}

export const retryAxiosGet = async (
    url: string,
    options: {delay: number, tries: number},
    axiosConfig?: {}
) => {
    const onError = () => {
        let triesLeft = options.tries - 1
        if(!triesLeft){
            return
        }
        return Wait(options.delay).then(() => {
            retryAxiosGet(url, options, axiosConfig)
        })
    }

    try {
        const response = await axios.get(url, axiosConfig)

        return response.data.result
    }catch(e){
        console.error(e)
        return onError()
    }
}
