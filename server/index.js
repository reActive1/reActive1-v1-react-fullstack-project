import express from 'express';
import { mongoURI } from './config.js';
import mongoose from 'mongoose';
import { router as routeUrls } from "./routes/routes.js";
import cors from "cors";

mongoose.connect(mongoURI);

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json( { limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true}));
app.use(cors())
app.use('/api',routeUrls);
app.listen(PORT, process.env.IP, function(){
	console.log("Server Started!");
});
