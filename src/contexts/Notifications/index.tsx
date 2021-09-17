import { toast } from 'react-hot-toast';
import styled from 'styled-components';

const StyledInfoToast = styled.div`
  font-size: 10px;
  font-weight: normal;
  text-shadow: black 1px 1px 2px;
  
`

//TODO: Make it smarter
export const infoToast = (message: string) => {

  toast.custom((t) => (
    <StyledInfoToast className={'panel black'}>
      {message}
    </StyledInfoToast>
  ), {

  })
}