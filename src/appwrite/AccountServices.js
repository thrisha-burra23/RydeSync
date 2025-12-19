import { Account, ID } from "appwrite";
import appwriteClient from ".";

class AppwriteAccount {
    constructor() {
        this.account = new Account(appwriteClient)
    }

    //for creating a new user
    async createAppwriteAccount(email, password, userName) {

        try {

            const result = await this.account.create({
                userId: ID.unique(),
                email: email,
                password: password,
                name: userName
            })

            console.log("the user was register successfully in the appwrite ", result);

            return result

        } catch (error) {

            console.log("while registering the user in the appwrite the error was occured", error.message);

            return error
        }


    }

    async loginUser(email, password) {
        try {

            const result = await this.account.createEmailPasswordSession({
                email,
                password
            })

            console.log("the user is successfully loged in " , result);
            return result
            
        } catch (error) {
            throw new Error("the user is not there in the appwrite account pls register the user befroe login", error)
        }
    }

}

export default AppwriteAccount