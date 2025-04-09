class UserEntity{
    public verifyDni(dni:string):boolean{
        if(dni.length > 8) return false;
        return true;
    }

    public verifyEmail(email:string):boolean{
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    public verifyPassword(password:string):boolean{
        if(password.length < 8) return false;
        return true;
    }

    public verifyName(name:string):boolean{
        if(name.length < 3) return false;
        return true;
    }
}

