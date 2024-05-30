import { NextFunction, Request, Response } from 'express';
import SectionService from '../../core/services/section.service';
import StatusCodes from '../../utils/enums/http-status-codes';
import { inject, injectable } from 'inversify';
import { SectionTypes } from '../../core/types/section.types';

@injectable()
class SectionController {
  constructor(
    @inject(SectionTypes.SectionService) private sectionService: SectionService,
  ) {}

  public async createSection(req: Request, res: Response, next: NextFunction) {
    try {
      const { title } = req.body;
      const section = await this.sectionService.createSection(title);
      res.json(section).status(StatusCodes.CREATED);
    } catch (e) {
      next(e);
    }
  }

  public async getAllSections(req: Request, res: Response, next: NextFunction) {
    try {
      const sections = await this.sectionService.getAllSections();
      res.json(sections).status(StatusCodes.SUCCESS);
    } catch (e) {
      next(e);
    }
  }
}

export default SectionController;
