import { makeAutoObservable } from 'mobx';
import {ethers} from 'ethers'

export class GlobalState {

    ethAddress: string = ""

    constructor() {
        makeAutoObservable(this)
    }


    setEthAddress = (ethAddress: string) => {
        if(!ethers.utils.isAddress(ethAddress)){
            return;
        }

        this.ethAddress = ethAddress

        return this.ethAddress
    }
}

const globalState = new GlobalState()

export default globalState