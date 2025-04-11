
class EnterpriseRepository {
    public async LogoutEnterprise() {
        window.localStorage.removeItem("enterprise-session")
        window.location.reload()
    }
}

export default new EnterpriseRepository()

