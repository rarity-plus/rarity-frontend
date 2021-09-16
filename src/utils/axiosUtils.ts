import axios from 'axios';

function wait(delay) {
  return new Promise((resolve) => setTimeout(resolve, delay));
}

export const wrappedAxiosGet = async (
  url: string,
  getOptions: {
    delay: number,
    tries: number
  },
  axiosConfig = {}
) => {
  const onError = () => {
      let triesLeft = getOptions.tries - 1
      if(!triesLeft){
          return;
      }
      return wait(getOptions.delay).then(() => {
        wrappedAxiosGet(url, getOptions, axiosConfig)
      })
  }

  try {
    const response = await axios.get(url, axiosConfig)

    return response.data.result
  }catch (error) {
    console.error(error)
    return onError()
  }
}