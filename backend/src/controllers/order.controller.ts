import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Order from '../models/order.model';

const createOrder = (req: Request, res: Response, next: NextFunction) => {
  const { customer_name, customer_address, customer_email, items, date, total_price, status } = req.body;

  const order = new Order({
    _id: new mongoose.Types.ObjectId(),
    customer_name, customer_address, customer_email, items, date, total_price, status,
  });

  return order
    .save()
    .then((order) => res.status(201).json({ order }))
    .catch((err) => res.status(500).json({ err }));
};
const readOrder = (req: Request, res: Response, next: NextFunction) => {
  const orderId = req.params.orderId;

  return Order.findById(orderId)
    .then((order) =>
      order
        ? res.status(200).json({ order })
        : res.status(404).json({ message: 'Order not found' })
    )
    .catch((err) => res.status(500).json({ err }));
};
const readAll = (req: Request, res: Response, next: NextFunction) => {
  return Order.find({}).then((orders) =>
    orders
      ? res.status(200).json({ orders })
      : res.status(500).json({ message: 'not found' })
  );
};
const updateOrder = (req: Request, res: Response, next: NextFunction) => {
  const orderId = req.params.orderId;

  return Order.findById(orderId).then((order) => {
    if (order) {
      order.set(req.body);
      return order
        .save()
        .then((order) => res.status(201).json({ order }))
        .catch((err) => res.status(500).json({ err }));
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  });
};
const deleteOrder = (req: Request, res: Response, next: NextFunction) => {
  const orderId = req.params.orderId;
  return Order.findByIdAndDelete(orderId)
    .then((order) => {
      order
        ? res.status(200).json({ message: 'Order deleted' })
        : res.status(404).json({ message: 'Order not found' });
    })
    .catch((err) => res.status(500).json({ err }));
};

export default {createOrder, readOrder, readAll, updateOrder, deleteOrder};