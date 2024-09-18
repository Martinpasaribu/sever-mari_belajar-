

// import {MongoClient,Db} from "mongodb";


// let mongoDb : Db


// export async function connectToDatabase(){
//     const  url = 'mongodb://127.0.0.1:27017'
//     const  client = new MongoClient(url);
//     mongoDb = client.db("Flutter_app(Mari_Belajar)")
//     console.log("mongodb connected successfully")
// }

// export function getDatabase() : Db{
//     return mongoDb
// }



import { MongoClient, Db } from "mongodb";

let mongoDb: Db | undefined;

export async function connectToDatabase(): Promise<void> {
    const url = 'mongodb+srv://martin12082000:Martin1208__+@ujicobadb.sjemocx.mongodb.net/?retryWrites=true&w=majority&appName=ujicobadb';
    const client = new MongoClient(url);

    try {
        await client.connect();
        mongoDb = client.db("test");
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
}

export function getDatabase(): Db {
    if (!mongoDb) {
        throw new Error("Database not connected. Call connectToDatabase first.");
    }
    return mongoDb;
}

