import { Account,ID } from "appwrite";
import appwriteClient from ".";

class AppwriteAccount{
    constructor(){
        this.account=new Account(appwriteClient)
    }

    //for creating a new user
    async createAppwriteAccount(email,password, fullname){
        const result = await this.account.create({
            userId:ID.unique(),
            email:email,
            password:password,
            name:fullname
        });
        return result;
    }

    //for getting a user
    async getAppwriteAccount(){
        try{
            const result=await this.account.get();
            return result;
        }catch(error){
            console.log("User Session not found")
            return null;
        }
    }
}

export default AppwriteAccount