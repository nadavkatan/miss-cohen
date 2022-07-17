import express from 'express';
// const nodemailer = require('nodemailer');
import {transporter } from '../config/nodemailer.config';
import { NextFunction, Request, Response } from 'express';


const router = express.Router();

// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: process.env.MAILER_EMAIL,
//       pass: process.env.MAILER_PASSWORD
//     }
// });

router.post('/email', (req, res) =>{
    const mailOptionsCustomer = {
        from: process.env.MAILER_EMAIL,
        to: req.body.customerEmail,
        subject: `Miss Cohen order confirmation, order ${req.body.orderNumber}`,
        text: `Thanks for ordering from Miss Cohen! We received you order and will start working on it right away! Items ordered: ${req.body.items}, total price: €${req.body.totalPrice}`
    };

    const mailOptionsSeller = {
        from: process.env.MAILER_EMAIL,
        to: process.env.MAILER_EMAIL,
        subject: `A new order on Miss Cohen webshop, order ${req.body.orderNumber}`,
        text: `Customer: ${req.body.customerFullName}, Items ordered: ${req.body.items}, shipping method: ${req.body.shippingMethod}, total paid: ${req.body.totalPrice}`
    }


transporter.sendMail(mailOptionsCustomer, function(error:any, info:any){
    if (error) {
      console.log(error);
    } else {
        transporter.sendMail(mailOptionsSeller, (error:any, info:any)=>{
            if(error){
                console.log(error)
            }else{
                res.status(200).json({message: info.response})
            }
        })
    }
  });

});

export = router;