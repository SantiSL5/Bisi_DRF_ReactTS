const JWTService = {
    getToken() {
        return window.localStorage.getItem("token")
    },
    saveToken(token: string) {
        window.localStorage.setItem("token", token)
    },
    destroyToken() {
        window.localStorage.removeItem("token")
    }
}

export default JWTService;