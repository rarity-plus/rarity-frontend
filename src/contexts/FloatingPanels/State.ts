import { makeAutoObservable } from 'mobx';
import { createElement, ReactNode } from 'react';

import TestPanel from './panels/testPanel';
import SuperTestPanel from './panels/superTestPanel';
import AttributesPanel from './panels/AttributesPanel';

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
        body: SuperTestPanel
      },
      "coolTestPanel": {
        title: "Skills",
        body: SuperTestPanel
      }
  }

  currentFloatingPanels: {id: string}[] = []

  constructor(){
      makeAutoObservable(this)
  }

  createFloatingPanel = (panelName: string) => {
      if(!FloatingPanelState.FloatingPanels[panelName]){
        console.log("PanelType doesn't exists")
        return;
      }

      let panelExists = this.currentFloatingPanels.find((val) => {
          return val.id === panelName
      })

      if(panelExists){
        console.log("Panel already created")
        return;
      }

      return this.currentFloatingPanels.push({
        id: panelName,
      })
  }

  //TODO: When you delete an element the list gets reordoned if you delete the first object
  destroyFloatingPanel = (id: string) => {
    const newArr = this.currentFloatingPanels.filter((val) => {
      return val.id != id
    })

    this.currentFloatingPanels = newArr
    // console.log(this.currentFloatingPanels)
    // delete this.currentFloatingPanels[id]
  }

}

export const floatingPanelState = new FloatingPanelState()
