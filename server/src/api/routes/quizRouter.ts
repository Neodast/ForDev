import express, { Router } from 'express';
import quizController from '../controllers/quizController';
const quizRouter: Router = express.Router();

quizRouter.get('/quizzes', quizController.getAllQuizzes);
quizRouter.post('/newQuiz', quizController.createQuiz);
quizRouter.delete('/deleteQuiz', quizController.deleteQuiz);

export default quizRouter;
