import React, { useState, useEffect } from 'react';

import { ModalProvider } from './contexts/Modal';

const Providers: React.FC = ({children}) => {
    
    return (
        <ModalProvider>
            {children}
        </ModalProvider>
    )
}

export default Providers;