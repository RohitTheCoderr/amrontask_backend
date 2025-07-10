
import mongoose from "mongoose";

const connectDatabase = async ()=>{
    const mongooseUrl = process.env.DB_URI;
    const dbName = process.env.DB_NAME;
    const options = {dbName};
 
    if(!(mongooseUrl && dbName)){
        console.log("Mongoose Url or Db name not found");
        throw new Error(`Mongoose Url or Db name not found`);
    }

    try{
        mongoose.set('strictQuery', false);
         await mongoose.connect(mongooseUrl, options );
        console.log("Database Connected Successfully");
        return mongoose.connection;
    }catch(err){
      console.log(`Error while connecting to db ${err}`);
          throw err;
    }
}

export {connectDatabase};