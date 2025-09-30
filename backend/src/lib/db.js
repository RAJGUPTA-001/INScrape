import mongoose from "mongoose"

export const connectdb = async() => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log('connected to db')
    }
    catch(error){
        console.log("error connecting to db",error)
        process.exit()
    }
} 