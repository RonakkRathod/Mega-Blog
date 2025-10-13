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
            const userAccount = await this.account.create( ID.unique(), email, password, name );

            if (userAccount) {
                 // call another method for login
                 return this.login({email, password})
            } else {
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({email , password}){
        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite service :: getCurrentUSer");
            throw error;
        }

        return null;
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