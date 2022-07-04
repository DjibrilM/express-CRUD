import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();
const DATA_BASE_URL = process.env.DBURL;
 
export class DB_CONNECT {
static async connect(){
try {
    await mongoose.connect(DATA_BASE_URL)
    console.log('connected to database')
} catch (error) {
    console.log('enable to connect the database',error)
}

}
}

