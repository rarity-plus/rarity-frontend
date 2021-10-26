import { makeAutoObservable } from 'mobx';
import {ethers} from 'ethers'

import Networks from "@configs/networks"

export class GlobalState {

    network: string = ""
    ethAddress: string = ""

    constructor() {
        makeAutoObservable(this)
    }

    setNetwork = (networkKey: string) => {
        if(!Object.keys(Networks).includes(networkKey)){
            return;
        }

        this.network = networkKey

        return this.network
    }

    setEthAddress = (ethAddress: string) => {
        if(!ethers.utils.isAddress(ethAddress)){
            return;
        }

        this.ethAddress = ethAddress

        return this.ethAddress
    }

    isNetworkSet = () => {
        if(this.network.length > 0){
            return true;
        }

        return false
    }
}

const globalState = new GlobalState()

export default globalState