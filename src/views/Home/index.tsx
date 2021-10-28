import React, { useEffect } from "react"

import useAuth from "@hooks/useAuth"
import useWeb3 from "@hooks/useWeb3"

import SummonList from "./components/SummonsList"

const HomeView = () => {
    const { login } = useAuth()
    const { account } = useWeb3()

    const onConnectHandle = () => {
        login()
    }

    return (
        <div className='flex justify-center w-full h-screen'>
            <div className='flex flex-col justify-center items-center w-full'>
                
                <div className='flex flex-col bg-gray-900 rounded-sm border border-gray-700 w-1/2 h-1/2'>
                        <div className='flex bg-gray-700 border border-gray-600 p-2'>
                            Rarity.plus
                        </div>
                       
                        <div className='grid grid-cols-3 h-full overflow-auto'>
                            <div className='col-span-2 overflow-auto'>
                                {account ? <SummonList/> : 'Please login'}
                            </div>

                            <div className=' flex flex-col bg-gray-700 border border-gray-600 '>
                                {!account && <button onClick={onConnectHandle} className='p-2 bg-gray-500'>Connect</button>}
                            </div>
                        </div>
                </div>

            </div>
        </div>
    )
}

export default HomeView