import pgSectionRepository from '../../db/dbRepositories/postgreSQL/section.repository';
import SectionModel from '../models/SectionModel';
import SectionRepository from '../repositories/SectionRepository';

class SectionService {
  constructor(readonly sectionRepository: SectionRepository) {}

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

export default new SectionService(pgSectionRepository);
