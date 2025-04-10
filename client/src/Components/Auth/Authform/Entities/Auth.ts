class AuthEntities{
    public SetTokenAndReload(token: string){
        if(token.length > 0){
            window.localStorage.setItem("enterprise-session", token)
            window.location.reload()
        }else throw new Error("Token not found")
    }
}

export default new AuthEntities();
