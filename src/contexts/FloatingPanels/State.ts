import { makeAutoObservable } from 'mobx';
import { createElement, ReactNode } from 'react';

import AttributesPanel from './panels/AttributesPanel';
import InventoryPanel from './panels/InventoryPanel';

export type FloatingPanelType = {
  title: string,
  body: ReactNode
}

export type FloatingPanelProps = {
  id: string,
  title: string,
  body: ReactNode,
}

export class FloatingPanelState {

  static FloatingPanels: {[key: string]: FloatingPanelType} = {
      "testPanel": {
        title: "Abilities",
        body: createElement(AttributesPanel)
      },
      "superTestPanel": {
        title: "Inventory",
        body:  createElement(InventoryPanel)
      },
  }

  currentFloatingPanels: {[key: string]: string} = {}

  constructor(){
      makeAutoObservable(this)
  }

  createFloatingPanel = (panelName: string) => {
      if(!FloatingPanelState.FloatingPanels[panelName]){
        console.log("PanelType doesn't exists")
        return;
      }

      // let panelExists = this.currentFloatingPanels.find((val) => {
      //     return val.id === panelName
      // })

      if(this.currentFloatingPanels[panelName]){
        console.log("Panel already created")
        return;
      }

      return this.currentFloatingPanels[panelName] = panelName
  }

  //TODO: When you delete an element the list gets reordoned if you delete the first object
  destroyFloatingPanel = (id: string) => {
    // const newArr = this.currentFloatingPanels.filter((val) => {
    //   return val.id != id
    // })
    //
    // this.currentFloatingPanels = newArr

    delete this.currentFloatingPanels[id]

    // console.log(this.currentFloatingPanels)
    // delete this.currentFloatingPanels[id]
  }

}

export const floatingPanelState = new FloatingPanelState()
