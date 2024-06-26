import { NextFunction, Request, Response } from 'express';
import { SectionService } from '../../core/services/section.service';
import StatusCodes from '../../utils/enums/http-status-codes';
import { inject } from 'inversify';
import { SectionTypes } from '../../utils/types/containers/section.types';
import { controller, httpGet, httpPost } from 'inversify-express-utils';
import { RequestWithBody } from '../../utils/types/request.type';
import { SectionCreateDto } from '../../utils/dtos/section/section-create.dto';

@controller('/section')
class SectionController {
  constructor(
    @inject(SectionTypes.SectionService) private sectionService: SectionService,
  ) {}

  @httpPost('/create')
  public async createSection(req: RequestWithBody<SectionCreateDto>, res: Response, next: NextFunction) {
    try {
      const { title } = req.body;
      const section = await this.sectionService.createSection(title);
      res.json(section).status(StatusCodes.CREATED);
    } catch (e) {
      next(e);
    }
  }

  @httpGet('/all')
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
