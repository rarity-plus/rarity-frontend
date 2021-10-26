import { makeAutoObservable } from 'mobx';


export class GameState {

  currentTokenId: number;
  ethAddress: string;

  constructor() {
    makeAutoObservable(this)
  }

  setCurrentTokenId = (tokenId: number) => {
    this.currentTokenId = tokenId

    return this.currentTokenId
  }

  setEthAddress = (address: string) => {
    this.ethAddress = address

    return this.ethAddress
  }
}


export const gameState = new GameState()