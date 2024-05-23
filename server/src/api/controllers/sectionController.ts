import { NextFunction, Request, Response } from 'express';
import SectionService from '../../core/services/SectionService';
import StatusCodes from '../../utils/enums/HttpStatusCodes';

class SectionController {
  public async createSection(req: Request, res: Response, next: NextFunction) {
    try {
      const { title } = req.body;
      const section = await SectionService.createSection(title);
      res.json(section).status(StatusCodes.CREATED);
    } catch (e) {
      next(e);
    }
  }

  public async getAllSections(req: Request, res: Response, next: NextFunction) {
    try {
      const sections = await SectionService.getAllSections();
      res.json(sections).status(StatusCodes.SUCCESS);
    } catch (e) {
      next(e);
    }
  }
}

export default new SectionController();
