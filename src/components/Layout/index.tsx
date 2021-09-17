import { ModalListener } from '../../contexts/Modal';
import { Toaster } from 'react-hot-toast';

const Layout: React.FC = ({children}) => {
    return (
      <>
        <Toaster position={'bottom-left'}/>
        <ModalListener />
        {children}
      </>
    )
}

export default Layout