import { Account,ID } from "appwrite";
import appwriteClient from ".";

class appwriteAccount{
    constructor(){
        this.account=new Account(appwriteClient)
    }

    //for creating a new user
    async createAppwriteAccount(email,password){
        
    }
}