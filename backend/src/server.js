// const express = require("express")
import express from "express";
import dotenv from "dotenv";
import path, { dirname } from "path";
import {connectdb} from "./lib/db.js";
import profiledatasearch from "./routes/searchprofile.route.js"
import fetchprofile from "./routes/fetchprofile.route.js"
import cors from 'cors';
// In server.js
import fetch from 'node-fetch';


dotenv.config();
const app = express()
const __dirname = path.resolve(); 

const port = process.env.PORT||3000;



app.use(cors());
app.use(express.json());

app.use('/api/search',profiledatasearch)
app.use('/api/fetchdata',fetchprofile)




app.get('/api/image-proxy', async (req, res) => {
    console.log("recieved")
  const url = req.query.url;
  const response = await fetch(url);
  res.set('Content-Type', response.headers.get('content-type'));
  res.set('Access-Control-Allow-Origin','*');
  response.body.pipe(res);
});








if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  // For any route not handled by an API:
  app.get("*", (req, res) => {
    // Must use sendFile to serve the actual HTML file
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

app.listen(port,()=>{
    console.log('server at '+port)
    connectdb()
}
)
