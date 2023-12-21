import conf from "../conf/conf";
import { Client, ID, Databases } from "appwrite";

export class ContactService{
    client = new Client();
    databases;
    
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
    }

    async ContactMsg({email , name, message}) {
        try {
            return await this.databases.createDocument(
                conf.appwriteContactDatabaseId,
                conf.appwriteContactCollectionId,
                ID.unique(),
                {
                    email,
                    name,
                    message
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: ContactMsg :: error", error);
        }
    }
}

const Contactservice = new ContactService()
export default Contactservice

