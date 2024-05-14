import SectionModel from '../models/SectionModel';

type SectionRepository = {
  getById(id: number): Promise<SectionModel>;
  getByTitle(title: string): Promise<SectionModel>;
  getAll(): Promise<SectionModel[]>;
  createSection(title: string): Promise<SectionModel>;
  updateSection(
    id: number,
    newSectionData: SectionModel,
  ): Promise<SectionModel>;
  deleteSection(section: SectionModel): Promise<void>;
};

export default SectionRepository;
