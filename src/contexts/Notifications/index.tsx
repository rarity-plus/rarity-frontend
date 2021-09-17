import { toast } from 'react-hot-toast';


export const infoToast = (message: string) => {

  toast.custom((t) => (
    <div className={'panel'}>
      {message}
    </div>
  ), {

  })
}