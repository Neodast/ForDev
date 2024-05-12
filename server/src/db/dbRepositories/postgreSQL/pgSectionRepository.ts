import { Repository } from 'typeorm';
import ISectionRepository from '../../../core/repositories/ISectionRepository';
import { Section } from '../../entities/postgreSQL/SectionEntity';
import { pgDataSource } from '../../appDataSourse';
import SectionModel from '../../../core/models/SectionModel';
import PgSectionMapper from '../../dbMappers/postgreSQL/PgSectionMapper';
import ApiError from '../../../utils/exceptions/ApiError';

class PgSectionRepository implements ISectionRepository {
  private readonly sectionRepository: Repository<Section>;

  constructor() {
    this.sectionRepository = pgDataSource.getRepository(Section);
  }

  private async findSection(
    criteria: Record<string, unknown>,
  ): Promise<Section> {
    const dbsection = await this.sectionRepository.findOne({
      where: criteria,
      relations: [
        'posts',
        'quizzes',
        'threads',
        'posts.author',
        'quizzes.author',
        'threads.author',
        'posts.comments',
        'quizzes.comments',
        'threads.comments',
      ],
    });
    if (!dbsection) {
      throw new Error('section is not found!');
    }
    return dbsection;
  }

  private async findSections(
    criteria?: Record<string, unknown>,
  ): Promise<Section[]> {
    const dbsections = await this.sectionRepository.find({
      where: criteria,
      relations: [
        'posts',
        'quizzes',
        'threads',
        'posts.author',
        'quizzes.author',
        'threads.author',
        'posts.comments',
        'quizzes.comments',
        'threads.comments',
      ],
    });
    if (!dbsections.length) {
      throw new Error('sections are not found!');
    }
    return dbsections;
  }

  public async getById(id: number): Promise<SectionModel> {
    return PgSectionMapper.mapToSectionModel(await this.findSection({ id }));
  }

  public async getByTitle(title: string): Promise<SectionModel> {
    return PgSectionMapper.mapToSectionModel(await this.findSection({ title }));
  }

  public async getAll(): Promise<SectionModel[]> {
    return (await this.findSections()).map((dbSection) =>
      PgSectionMapper.mapToSectionModel(dbSection),
    );
  }

  public async createSection(title: string): Promise<SectionModel> {
    if (!title) {
      throw ApiError.BadRequest('Title is undefined!');
    }
    const section = this.sectionRepository.create({ title });
    return PgSectionMapper.mapToSectionModel(
      await this.sectionRepository.save(section),
    );
  }

  public async updateSection(
    id: number,
    newSectionData: SectionModel,
  ): Promise<SectionModel> {
    const dbSection = await this.getById(id);
    Object.assign(dbSection, newSectionData);
    return PgSectionMapper.mapToSectionModel(
      await this.sectionRepository.save(dbSection),
    );
  }

  public async deleteSection(section: SectionModel): Promise<void> {
    const dbSection = await this.findSection({ section });
    await this.sectionRepository.remove(dbSection);
  }
}

export default new PgSectionRepository();
