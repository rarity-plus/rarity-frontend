import { makeAutoObservable } from 'mobx';
import {ethers} from 'ethers'

export class GlobalState {

    ethAddress: string = ""
    summonId: number = 0

    constructor() {
        makeAutoObservable(this)
    }

    setSummonId = (id: number) => {
        this.summonId = id

        return this.summonId
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