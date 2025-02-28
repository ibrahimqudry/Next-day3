const { mongoose } = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI;

export function connectDB(){
    mongoose.connect(MONGODB_URI).then(()=>{
        console.log("connect success");
    }).catch((err)=>{
        console.log("connect failed",err);
    });
}