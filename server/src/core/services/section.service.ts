import { inject, injectable } from 'inversify';
import SectionModel from '../models/section.model';
import SectionRepository from '../repositories/section.repository.type';
import { SectionTypes } from '../types/section.types';

@injectable()
class SectionService {
  constructor(@inject(SectionTypes.SectionRepository) private sectionRepository: SectionRepository) {}

  public async getSection(title: string): Promise<SectionModel> {
    return this.sectionRepository.getByTitle(title);
  }

  public async createSection(title: string): Promise<SectionModel> {
    return this.sectionRepository.createSection(title);
  }

  public async deleteSection(title: string): Promise<void> {
    const dbSection = await this.sectionRepository.getByTitle(title);
    return this.sectionRepository.deleteSection(dbSection);
  }

  public async getAllSections(): Promise<SectionModel[]> {
    return this.sectionRepository.getAll();
  }
}

export default SectionService;
