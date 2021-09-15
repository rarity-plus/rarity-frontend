
import { ModalListener } from '../../contexts/Modal';

const Layout: React.FC = ({children}) => {
    return (
      <>
        <ModalListener />
        {children}
      </>
    )
}

export default Layout