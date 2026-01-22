import mangoose from 'mongoose';


const connectDB = async ()=>{
    await mangoose.connect(process.env.DB_STRING+"Todo-list")
}
export default connectDB;