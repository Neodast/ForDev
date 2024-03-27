import { NextFunction, Request, Response } from 'express';
import quizService from '../../core/services/quizService';
import QuizModel from '../../core/models/quizModel';

class QuizController {
  public async createQuiz(req: Request, res: Response, next: NextFunction) {
    try {
      const quiz: QuizModel = req.body;
      const createdQuiz: QuizModel = await quizService.createQuiz(quiz);
      res.json(createdQuiz);
    } catch (e) {
      next(e);
    }
  }

  public async deleteQuiz(req: Request, res: Response, next: NextFunction) {
    try {
      const quiz: QuizModel = req.body;
      res.send(quizService.deleteQuiz(quiz));
    } catch (e) {
      next(e);
    }
  }

  async getAllQuizzes(req: Request, res: Response, next: NextFunction) {
    try {
      const quizzes = await quizService.getAllQuizzes();
      res.json(quizzes);
    } catch (e) {
      next(e);
    }
  }
}

export default new QuizController();
