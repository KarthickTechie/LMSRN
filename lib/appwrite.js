import { Client,Account,ID, Avatars, Databases } from 'react-native-appwrite';

export const appwriteConfig = {
    endpoint : "https://cloud.appwrite.io/v1",
    platform:"com.syarc.lms",
    projectId:"6682826100252d5757a8",
    databaseId:"668286b300224f2abd57",
    userCollectionId:"668286dc00040824e765",
    videoCollectionId:"66828704000cf0e54f30",
    storageId:"66828ac2003351432601"

}

// Init your React Native SDK
const client = new Client();
const {endpoint,projectId,platform,databaseId,userCollectionId} = appwriteConfig
console.log(`endpoint ${endpoint} projectId ${projectId} platform ${platform}`)
client
    .setEndpoint(endpoint) // Your Appwrite Endpoint
    .setProject(projectId) // Your project ID
    // .setPlatform(platform) // Your application ID or bundle ID.
;

const account = new Account(client)

const avatars = new Avatars(client)

const databases = new Databases(client)

export const createUser = async (email,password,username)=>{
    try{
        const newAccount  = await  account.create(ID.unique(),email,password,username)
        if(!newAccount)  throw Error
        const avatarUrl= avatars.getInitials(username)
        await signIn(email,password)

       const newUser = await databases.createDocument(databaseId,userCollectionId,ID.unique(),{
            accountId:newAccount.$id,
            email,
            username,
            avatar:avatarUrl
        })

        return newUser

    }catch(error){
        console.log(`appwrite create user error => ${error}`)
        throw new Error(error)
    }
}

export const signIn = async(email,password)=>{
    try{
        account.deleteSession('current')

        const session = await account.createEmailPasswordSession(email,password)
        return session
    }catch(error){
        
        console.log(`create session error => ${error}`)
        throw new Error(error)
    }


}

