import { makeAutoObservable } from "mobx"
import { ReactNode } from "react"
import { ModalType } from "./types"


export class UIState {

    currentModal: ModalType | null = null

    constructor(){
        makeAutoObservable(this)
    }

    showModal = (title: string, component: ReactNode, closable = true) => {
        if(!this.currentModal?.closable){
            return;
        }

        this.currentModal = {
            title: title,
            component: component,
            closable: closable
        }

        return this.currentModal
    }

    closeModal = () => {
        this.currentModal = null
    }
}


const uiState = new UIState()

export default uiState