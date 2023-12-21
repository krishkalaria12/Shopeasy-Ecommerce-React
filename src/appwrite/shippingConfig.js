import conf from "../conf/conf";
import { Client, ID, Databases } from "appwrite";

export class ShippingService{
    client = new Client();
    databases;
    
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
    }

    async ShippingInfo({email ,phone, name, address, city, country, postal}) {
        try {
            return await this.databases.createDocument(
                conf.appwriteShippingDatabaseId,
                conf.appwriteShippingCollectionId,
                ID.unique(),
                {
                    email,
                    phone,
                    name,
                    address,
                    city,
                    country,
                    postal,
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: ShippingService :: error", error);
        }
    }
}

const shippingService = new ShippingService()
export default shippingService

