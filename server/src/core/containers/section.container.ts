import { Container } from 'inversify';
import { SectionTypes } from '../../utils/types/containers/section.types';
import SectionService from '../services/section.service';
import SectionController from '../../api/controllers/section.controller';
import PgSectionRepository from '../../db/dbRepositories/section.repository';
import SectionRepository from '../repositories/section.repository.type';

export const sectionContainer = new Container({ defaultScope: 'Singleton' });

sectionContainer
  .bind<SectionService>(SectionTypes.SectionService)
  .to(SectionService);
sectionContainer
  .bind<SectionRepository>(SectionTypes.SectionRepository)
  .to(PgSectionRepository);
sectionContainer
  .bind<SectionController>(SectionTypes.SectionController)
  .to(SectionController);