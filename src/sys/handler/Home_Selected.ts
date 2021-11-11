class Home_Selected {
    static EVENT: string
    private wss: WebSocketServer

    public constructor(wss: WebSocketServer) {
        this.wss = wss
        this.hydrate = this.hydrate.bind(this)
        this.handle = this.handle.bind(this)
    }

    public hydrate(msg: HANDLER_MESSAGE<any>): void {
        msg.ws.home_selected = msg.payload.home_selected
    }

    public handle(msg: HANDLER_MESSAGE<any>): void {
        this.hydrate(msg)
    }
}

Home_Selected.EVENT = "SAVE_HOME_SELECTED"
export default Home_Selected