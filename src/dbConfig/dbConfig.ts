
import mongoose from "mongoose";


export async function connect() {

    try {
        mongoose.connect(process.env.MONGO_URI!);
        const connection= mongoose.connection;
        connection.on('connected',()=>{
            console.log('Connected successfully');  
        })

        connection.on('err', (e)=>{
            console.log("Error:" + e);
            process.exit();
            
        })
    } catch (error) {
       console.log('something went wrong');
       console.log(error);
       
       
    }
}