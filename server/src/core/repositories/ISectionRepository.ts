import SectionModel from '../models/sectionModel';

interface ISectionRepository {
  getById(id: number): Promise<SectionModel>;
  getByTitle(title: string): Promise<SectionModel>;
  getAll(): Promise<SectionModel[]>;
  createSection(title: string): Promise<SectionModel>;
  updateSection(id: number, newSectionData: SectionModel): Promise<SectionModel>;
  deleteSection(section: SectionModel): Promise<void>;
}

export default ISectionRepository;