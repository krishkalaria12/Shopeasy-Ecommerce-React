const conf = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteContactDatabaseId: String(import.meta.env.VITE_APPWRITE_CONTACT_DATABASE_ID),
    appwriteShippingDatabaseId: String(import.meta.env.VITE_APPWRITE_SHIPPING_DATABASE_ID),
    appwriteContactCollectionId: String(import.meta.env.VITE_APPWRITE_CONTACT_COLLECTION_ID),
    appwriteShippingCollectionId: String(import.meta.env.VITE_APPWRITE_SHIPPING_COLLECTION_ID),
    authdomain: String(import.meta.env.VITE_AUTH0_PROVIDER_DOMAIN),
    authclient: String(import.meta.env.VITE_AUTH0_PROVIDER_CLIENTID)
}

export default conf