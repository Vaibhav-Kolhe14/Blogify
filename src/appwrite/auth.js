import config from "../config/config";
import {Client, Account, ID} from "appwrite";


export class AuthService {
    client = new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({email, password, name}) {
        try{
            const userAccount = await this.account.create(
                ID.unique(), 
                email, 
                password, 
                name
            )    // here we use sequence as in docs

            if(userAccount){
                console.log("Account created successfully");
                return this.login({email, password})
               
            }else{
                console.log("Error in appwrite::auth::createAccount: ", error);
                return userAccount;
            }
        }catch(error){
            console.log("Appwrite service :: createAccount :: error ", error);
            throw error;
        }
    }

    async login({email, password}) {
        try {
           const loginSession = await this.account.createEmailPasswordSession(email, password);
           return loginSession
        } catch (error) {
            console.log("Appwrite service :: login :: error:", error);
            throw error;
        }
    }

    async getCurrentUser() {
        try {
          // return  await this.account.get();

          const fetchCurrentLoggedInUser = await this.account.get();
        //   console.log("Current User: ", fetchCurrentLoggedInUser);
          return fetchCurrentLoggedInUser
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error)
            throw error;
        }

        //return null;
    }

    async logout() {
        try {
            await this.account.deleteSessions();
            console.log("Logout Successfully");
        } catch (error) {
            // throw error
            console.log("Appwrite service :: logout :: error", error);
            throw error;
        }
    }
}

const authService = new AuthService();

export default authService;
