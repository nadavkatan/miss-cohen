import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import {config} from './config/config';
import productRoute from './routes/product.route';
import orderRoute from './routes/order.route';
import confirmationRouter from './routes/confirmation.route';
import authRouter from './routes/auth.route';
import Product from './models/product.model';

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

    app.use(express.urlencoded({ extended:true}));
    app.use(express.json());

            /** Rules of our API */
            app.use((req, res, next) => {
                res.header('Access-Control-Allow-Origin', '*');
                res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        
                if (req.method == 'OPTIONS') {
                    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
                    return res.status(200).json({});
                }
        
                next();
            });

   /** Routes */
   app.use('/products', productRoute);
   app.use('/orders', orderRoute);
   app.use('/confirmation', confirmationRouter);
   app.use('/auth', authRouter);

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