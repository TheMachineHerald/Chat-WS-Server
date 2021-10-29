class User {
    constructor(ws) {
      this.ws = ws
    }

    create_user(usr) {
      this.ws
        .to('general')
        .emit(`USER_JOINED`)
    }
}

export default User