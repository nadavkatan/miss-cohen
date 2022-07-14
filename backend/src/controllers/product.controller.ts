import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Product from '../models/product.model';

const createProduct = (req: Request, res: Response, next: NextFunction) => {
  const { name, price, qtyInStock } = req.body;

  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name, price, qtyInStock,
  });

//   try{
//    return product.save().then((product) => res.status(201).json({ product }));
//   }catch(err){
//     res.status(500).json({err})
//   }

  return product
    .save()
    .then((product) => res.status(201).json({ product }))
    .catch((err) => res.status(500).json({ err }));
};
const readProduct = (req: Request, res: Response, next: NextFunction) => {
  const productId = req.params.productId;

  return Product.findById(productId)
    .then((product) =>
      product
        ? res.status(200).json({ product })
        : res.status(404).json({ message: 'Product not found' })
    )
    .catch((err) => res.status(500).json({ err }));
};
const readAll = (req: Request, res: Response, next: NextFunction) => {
  return Product.find({}).then((products) =>
    products
      ? res.status(200).json( products )
      : res.status(500).json({ message: 'not found' })
  );
};
const updateProduct = (req: Request, res: Response, next: NextFunction) => {
  const productId = req.params.productId;

  return Product.findById(productId).then((product) => {
    if (product) {
      product.set(req.body);
      return product
        .save()
        .then((product) => res.status(201).json({ product }))
        .catch((err) => res.status(500).json({ err }));
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  });
};
const deleteProduct = (req: Request, res: Response, next: NextFunction) => {
  const productId = req.params.productId;
  return Product.findByIdAndDelete(productId)
    .then((product) => {
      product
        ? res.status(200).json({ message: 'Product deleted' })
        : res.status(404).json({ message: 'Product not found' });
    })
    .catch((err) => res.status(500).json({ err }));
};

export default {createProduct, readProduct, readAll, updateProduct, deleteProduct};