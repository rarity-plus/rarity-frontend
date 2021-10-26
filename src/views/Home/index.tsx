import useRPCProvider from "@hooks/useRPCProvider"
import React from "react"

const Home = () => {

    return (
        <div className='flex justify-center w-full h-screen'>
            <div className='flex flex-col justify-center items-center w-full'>
                
                <div className='bg-gray-900 rounded-sm border border-gray-700 w-1/2 h-1/2'>
                   <div className='flex flex-col'>
                        <div className='flex bg-gray-700 border border-gray-600 p-2'>
                            Rarity.plus
                        </div>

                        <div className='grid grid-cols-1 grid-rows-2'>
                            <div className=' row-span-2 p-2 flex-grow overflow-auto max-h-full'>
                                <p>Summoner</p>
                                <p>Summoner</p>
                                <p>Summoner</p>
                                <p>Summoner</p>
                                <p>Summoner</p>
                                <p>Summoner</p>
                                <p>Summoner</p>
                                <p>Summoner</p>
                            </div>

                            <div className=' row-span-1 p-2 flex flex-col bg-gray-700 border border-gray-600'>
                                <button className=''>Connect</button>
                            </div>
                        </div>
                   </div>
                </div>

            </div>
        </div>
    )
}

export default Home