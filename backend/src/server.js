// const express = require("express")
import express from "express";
import dotenv from "dotenv";
import path, { dirname } from "path";

dotenv.config();
const port = process.env.PORT||3000;

const app = express()
const __dirname = path.resolve(); 
















if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")))
    
    app.get("*",(_,res)=>{
        res.send(path.join(__dirname,"../frontend/dist/index.html"))
    })

}
app.listen(port,()=>console.log('server at '+port))
