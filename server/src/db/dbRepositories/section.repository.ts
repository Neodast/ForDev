import { Repository } from 'typeorm';
import SectionRepository from '../../core/repositories/section.repository.type';
import { Section } from '../entities/section.entity';
import { pgDataSource } from '../appDataSourse';
import SectionModel from '../../core/models/section.model';
import PgSectionMapper from '../dbMappers/section.db-mapper';
import ApiError from '../../utils/exceptions/api-error';

class PgSectionRepository implements SectionRepository {
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
        'threads',
        'posts.author',
        'threads.author',
        'posts.comments',
        'threads.comments',
        'posts.comments.author',
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
        'threads',
        'posts.author',
        'threads.author',
        'posts.comments',
        'threads.comments',
        'posts.comments.author',
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
