import * as SocketIOClient from 'socket.io-client'

// NOTE: Hot reload
class SocketClient {
  private socket: SocketIOClient.Socket
  constructor() {
    // @ts-ignore
    this.socket = io()

    this.socket.on("connect", function () {
      console.log("connect")
      // document.body.innerHTML = ""
    })

    this.socket.on("disconnect", function (message: any) {
      console.log("disconnect " + message)
      // document.body.innerHTML += "Disconnected from Server : " + message + "<br/>"
      const reload = () => {
        window.location.reload();
      }
      setTimeout(reload, 2000)
    })

    this.socket.on("message", function (message: any) {
      console.log(message)
      // document.body.innerHTML += message + "<br/>"
    })

    this.socket.on("random", function (message: any) {
      console.log(message)
      // document.body.innerHTML += message + "<br/>"
    })
  }
}

new SocketClient()
