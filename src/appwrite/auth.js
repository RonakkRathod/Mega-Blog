import conf from "../conf/config";
import { Client,Account,ID } from "appwrite"

export class AuthService {
    client = new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }
    
    
    async createAccount({email,password,name}) { // Required fields
        try {
            const userAccount = await this.account.create({ 
                userId : ID.unique(), 
                email :email,
                password:  password,
                name:  name,
             });

            if (userAccount) {
                  await this.account.createEmailPasswordSession({email, password});
                 // call another method for login
                 return this.login({email, password})
            } else {
                return userAccount;
            }
        } catch (error) {
            console.log("appwrite signup error",error); 
            throw error;
        }
    }

    async login({email , password}){
        try {
             return await this.account.createEmailPasswordSession({email, password});
        } catch (error) {
            console.log("appwrite login error",error);
            
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite service :: getCurrentUSer");
           return null;
        }
       
    }

    async logout() {
        try {
            await this.account.deleteSessions() // delete all current sessions
        } catch (error) {
            throw error;
        }
    }
}

const authService = new AuthService();

export default authService;