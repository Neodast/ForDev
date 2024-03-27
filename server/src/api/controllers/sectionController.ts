import { NextFunction, Request, Response } from 'express';
import sectionService from '../../core/services/sectionService';

class SectionController {
  public async createSection(req: Request, res: Response, next: NextFunction) {
    try{
      const {title} = req.body;
      const section = await sectionService.createSection(title);
      res.json(section);
    }catch(e){
      next(e);
    }
  }

  public async getAllSections(req: Request, res: Response, next: NextFunction) {
    try {
      const sections = await sectionService.getAllSections();
      res.send(sections);
    } catch (e) {
      next(e);
    }
  }
}

export default new SectionController();