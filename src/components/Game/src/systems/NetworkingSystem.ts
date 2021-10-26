import { io, Socket } from 'socket.io-client';


class NetworkingSystem {

  private static instance: NetworkingSystem

  socket: Socket;

  eventsToRegister = new Map()

  private constructor() {}

  public static get() {
      if(!NetworkingSystem.instance){
        NetworkingSystem.instance = new NetworkingSystem()
      }

      return NetworkingSystem.instance
  }

  public connect(ethAddress: string, callback: (res: any, socket: Socket) => void) {
      this.socket = io("http://localhost:4510")

      this.socket.emit("register", {ethAddress: ethAddress, position: {x: 0, y: 0, z: 0}}, (res) => callback(res, this.socket))
  }

  public registerEvents() {
      if(!this.socket){
        console.error(`[NetworkingSystem]: Client isn't initialized`)
        return;
      }

      this.eventsToRegister.forEach((value, key) => {
          this.socket.on(key, (res) => value(res, this.socket))
      })
  }

  public registerEvent(eventName: string, eventHandle: (response: any, socket: Socket) => void) {
    if(this.socket){
      this.socket.on(eventName, (res) => eventHandle(res, this.socket))
    }else{
      this.eventsToRegister.set(eventName, eventHandle)
    }
  }

  public emitEvent(eventName: string, obj: any, callback: any) {
    if(!this.socket){
      console.error(`[NetworkingSystem]: Not connected`)
      return;
    }

    this.socket.emit(eventName, obj, callback)
  }

}

export default NetworkingSystem