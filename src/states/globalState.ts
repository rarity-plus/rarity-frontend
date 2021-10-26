import { makeAutoObservable } from 'mobx';

import Networks from "@configs/networks"

export class GlobalState {

    network: string = ""

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

    isNetworkSet = () => {
        if(this.network.length > 0){
            return true;
        }

        return false
    }
}

const globalState = new GlobalState()

export default globalState