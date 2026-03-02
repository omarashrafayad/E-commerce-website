import mongoose from 'mongoose'
const DBconnection = ()=>{
    mongoose.connect(process.env.DATABASE!).then((connection)=>{

        console.log(`Database Connected: ${connection.connection.host}`);
    }).catch((err)=>{
        console.log(`failed to connected database ${err}` )
    })
}
export default DBconnection;