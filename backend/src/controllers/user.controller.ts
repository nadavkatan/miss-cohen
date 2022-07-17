import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import User from '../models/user.model';

//adjust third var

const createUser = (req: Request, res: Response, next: NextFunction) => {
  const { first_name,last_name } = req.body;

  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    first_name,last_name,
  });

  return user
    .save()
    .then((user) => res.status(201).json({ user }))
    .catch((err) => res.status(500).json({ err }));
};
const readUser = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId;

  return User.findById(userId)
    .then((user) =>
      user
        ? res.status(200).json({ user })
        : res.status(404).json({ message: 'User not found' })
    )
    .catch((err) => res.status(500).json({ err }));
};
const readAll = (req: Request, res: Response, next: NextFunction) => {
  return User.find({}).then((users) =>
    users
      ? res.status(200).json({ users })
      : res.status(500).json({ message: 'not found' })
  );
};
const updateUser = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId;

  return User.findById(userId).then((user) => {
    if (user) {
      user.set(req.body);
      return user
        .save()
        .then((user) => res.status(201).json({ user }))
        .catch((err) => res.status(500).json({ err }));
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  });
};
const deleteUser = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId;
  return User.findByIdAndDelete(userId)
    .then((user) => {
      user
        ? res.status(200).json({ message: 'User deleted' })
        : res.status(404).json({ message: 'User not found' });
    })
    .catch((err) => res.status(500).json({ err }));
};

export default {createUser, readUser, readAll, updateUser, deleteUser};