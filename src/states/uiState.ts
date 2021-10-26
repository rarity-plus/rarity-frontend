import { makeAutoObservable } from "mobx"


export class UIState {

    

    constructor(){
        makeAutoObservable(this)
    }
}


const uiState = new UIState()

export default uiState