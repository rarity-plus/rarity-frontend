import { makeAutoObservable } from 'mobx';


export class GameState {

  currentTokenId: number;

  constructor() {
    makeAutoObservable(this)
  }

  setCurrentTokenId = (tokenId: number) => {
     this.currentTokenId = tokenId

    return this.currentTokenId
  }

}


export const gameState = new GameState()