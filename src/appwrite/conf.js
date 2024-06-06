import config from "../config/config";
import {Client, ID, Databases, Storage, Query} from "appwrite";


export class Service{
    clinet = new Client();
    databases;
    bucket;

    constructor(){
        this.clinet
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        this.databases = new Databases(this.clinet);
        this.bucket = new Storage(this.clinet)
    }

    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            console.log('userID: ',userId);
            const createdPost =  await this.databases.createDocument(                    //parameters as per documentation
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,      // we can take ID.unique() also
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
            console.log("Post created !");
            return createdPost
        } catch (error) {
            console.log("Appwrite service :: createPost :: error ", error);
            throw error
        }
    }


    async updatePost(slug, {title, content, featuredImage, status}) {
        try {
            const updatedPost = await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
            console.log('Post updated: (in appwrite.config.js)');
            return updatedPost;
        } catch (error) {
            console.log('Appwrite service :: updatePost :: error: ', error);
        }
    }


    async deletePost( slug ) {
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
            console.log('Post deleted: ',slug);
            return true
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error ",error);
            return false
        }
    }


    async getPost(slug) {
        try {
            const fetchOnePost = await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
            return fetchOnePost
        } catch (error) {
            console.log("Appwrite service :: getPost :: error ", error);
            throw error
        }
    }

    
    async getPosts(queries = [Query.equal("status", ["active"])]) {   // we pass quary cause we want only active posts
        try {
            const fetchPosts = await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                queries,
                // [
                //     Query.equal("status", "active")
                // ]
            )
            return fetchPosts
        } catch (error) {
            console.log("Appwrite service :: getPosts :: error ",error);
            throw error
        }
    }


    //file upload service 

    async uploadFile(file) {
        try {
            const fileUploadResponse = await this.bucket.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            )
            console.log('File upload: ',fileUploadResponse);
            return fileUploadResponse
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error ",error);
            return error
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                config.appwriteBucketId,
                fileId
            )
            console.log('File deleted: ', fileId);
            return true
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error ",error);
            return false
        }
    }

    getFilePreview(fileId) {
        return this.bucket.getFilePreview(
            config.appwriteBucketId,
            fileId
        )
    }
}


const service = new Service()

export default service