//@ts-nocheck
import conf from "../conf/config";
import {Client, ID, Databases, Storage, Query} from "appwrite"

export class Service{
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
            this.databases = new Databases(this.client);
            this.bucket = new Storage(this.client); 
    }

    async createPost({title, slug, content, featuredImage, status, userId}){
          try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
              console.log("data:", data); // Log the data object
        } catch (error) {
            console.log("error at createPost", error);
        }
    } 

    async updatePost(slug, {title, content, featuredImage, status,}){
        try {
            return await this.databases.updateDocument({
                databaseId : conf.appwriteDatabaseId,
                collectionId : conf.appwriteCollectionId,
                documentId : slug,
                data : {
                    title,
                    content,
                    featuredImage,
                    status
                }
            })
        } catch (error) {
            console.log("err at updatePost",error);
            
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument({
                databaseId : conf.appwriteDatabaseId,
                collectionId : conf.appwriteCollectionId,
                documentId :slug  
            })
            return true;
        } catch (error) {
            console.log("error at deletePost",error);
            return false;
        }
    }
 
    // get just one post by slug
    async getPost(slug){
        try {
            return await this.databases.getDocument({
                databaseId : conf.appwriteDatabaseId,
                collectionId : conf.appwriteCollectionId,
                documentId : slug   
            })
        } catch (error) {
            console.log("error at getPost",error);
            return false
        }
    }

    // get all post conditionally whos status is active 
    async getPosts(queries = [Query.equal("status","active")]){
        try {
            return await this.databases.listDocuments(
                 conf.appwriteDatabaseId,
                 conf.appwriteCollectionId,
                queries
            )
        } catch (error) {
            console.log("error at getPosts ",error);
        }
    }


    // file upload services

    async uploadFile(file){
        try {
            return await this.bucket.createFile({
                bucketId : conf.appwriteBucketId,
                fileId : ID.unique(),
                file
            })
        } catch (error) {
            console.log("error at uploadFile",error);
            return false;
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile({
                bucketId : conf.appwriteBucketId,
                fileId
            })
        } catch (error) {
            console.log("error at deleteFile",error);
            return false;
        }
    }

    getFilePreview(fileId) {
        return this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
    }

    getFileView(fileId) {
        return this.bucket.getFileView({
            bucketId: conf.appwriteBucketId, 
            fileId: fileId,
            width: "30px",
            height: "30px",
        });
    }
}

const service = new Service();

export default service;