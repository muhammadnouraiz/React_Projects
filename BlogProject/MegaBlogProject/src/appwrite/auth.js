import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            // Appwrite v1.5+ Method: create(userId, email, password, name)
            const userAccount = await this.account.create(
                ID.unique(), 
                email, 
                password, 
                name
            );

            if (userAccount) {
                // If account creation is successful, log the user in immediately
                return this.login({ email, password });
            }

            return userAccount;
        } catch (error) {
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            // Appwrite v1.5+ Method: createEmailPasswordSession
            // Note: In older versions (v1.4), this was 'createEmailSession'
            return await this.account.createEmailPasswordSessions(
                email, 
                password
            );
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            // Checks if a session exists and returns the user data
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error);
        }
        return null;
    }

    async logout() {
        try {
            // 'deleteSession' with 'current' deletes only the active session for this browser
            // 'deleteSessions' (plural) would delete ALL sessions across all devices
            await this.account.deleteSessions('current');
        } catch (error) {
            console.log("Appwrite service :: logout :: error", error);
        }
    }
}

const authService = new AuthService();
export default authService;