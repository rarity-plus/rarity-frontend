import { useWeb3React } from "@web3-react/core"
import React, { FC, useEffect, useRef } from "react"
import { useHistory } from "react-router"


const Layout: FC = ({children}) => {
    const history = useHistory()

    useEffect(() => {
        const handleChainAccountChanged = () => {
            history.go(0)
        }

        (window as any)['ethereum'].on('chainChanged', handleChainAccountChanged);
        (window as any)['ethereum'].on('accountsChanged', handleChainAccountChanged);

        return () => {
            (window as any)['ethereum'].removeListener('chainChanged', handleChainAccountChanged)
            (window as any)['ethereum'].removeListener('accountsChanged', handleChainAccountChanged)
        }
    }, [])

    return (
        <>
            {/*ModalListener*/}
            {children}
        </>
    )
}

export default Layout