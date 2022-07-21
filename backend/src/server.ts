import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import {config} from './config/config';
import productRouter from './routes/product.route';
import orderRouter from './routes/order.route';
import confirmationRouter from './routes/confirmation.route';
import authRouter from './routes/auth.route';
import userRouter from './routes/user.route';
import Product from './models/product.model';
// const MongoStore = require('connect-mongo');
import MongoStore from 'connect-mongo';
const cors = require('cors');
import passport from 'passport';
const session = require('express-session');

const app = express();

// connect to mondoDB // 
mongoose.connect(config.mongo.url, {retryWrites: true, w: "majority"})
.then(()=>{
    console.log('Connected to mongoDB');
    
    startServer()
})
.catch(err => console.log(err));

const startServer = () =>{
    app.use((req, res, next)=>{
        console.log(`Incoming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

        res.on('finish', ()=>{
            console.log(`Outgoing -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`);
        });
        next();
    });

    const sessionStore = MongoStore.create({
        client: mongoose.connection.getClient(),
        mongoUrl: process.env.MONGOOSE_URI,
        collectionName: "sessions"
    })

    /** Middlewares */
    app.use(express.urlencoded({ extended:true}));
    app.use(express.json());
    app.use(cors({
        credentials: true,
        origin: 'http://localhost:3000'
    }));
    app.use(session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: sessionStore,
        cookie:{
            maxAge: 1000 * 60 * 60,
        }
    }));

    require('./config/auth.config');
    app.use(passport.initialize());
    app.use(passport.session());

            /** Rules of our API */
            app.use((req, res, next) => {
                res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
                res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        
                if (req.method == 'OPTIONS') {
                    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
                    return res.status(200).json({});
                }
        
                next();
            });

   /** Routes */
   app.use('/products', productRouter);
   app.use('/orders', orderRouter);
   app.use('/confirmation', confirmationRouter);
   app.use('/auth', authRouter);
   app.use('/user', userRouter);

   /** Serve files for production */
   if (process.env.NODE_ENV === "production") {
    const path = require('path');
    app.use(express.static(path.join(__dirname,'..', 'frontend', "build")));
    app.get("*", function(req, res) {
      res.sendFile(path.join(__dirname,'..', 'frontend', "build", "index.html"));
    });
  }

           /** Healthcheck */
           app.get('/ping', (req, res, next) => res.status(200).json({message:'pong'}));

           /** Error */
           app.use((req,res, next)=>{
               const error = new Error('Not found');
               console.error(error);
   
               res.status(404).json({message:error.message})
           });

    http.createServer(app).listen(config.server.port, ()=> console.log(`Server is running on port ${config.server.port}`));
}