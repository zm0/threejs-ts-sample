import * as SocketIOClient from 'socket.io-client'

function debounce(f: () => void, ms: number) {
  let timer = null;

  return function (...args: any[]) {
    const onComplete = () => {
      f.apply(this, args);
      timer = null;
    };

    if (!!timer) clearTimeout(timer);
    timer = setTimeout(onComplete, ms);
  };
}

const debouncedReload = debounce(() => {
  window.location.reload();
}, 1000)

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
      debouncedReload()
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
