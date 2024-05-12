import express, { Router } from 'express';
import LikedController from '../controllers/LikedController';

const likedRouter: Router = express.Router();

likedRouter.post('/like', LikedController.like)

export default likedRouter;
