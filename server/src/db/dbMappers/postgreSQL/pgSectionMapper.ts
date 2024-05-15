import SectionMapper from '../../../core/mappers/SectionMapper';
import SectionModel from '../../../core/models/SectionModel';
import { Section } from '../../entities/postgreSQL/SectionEntity';
import PgPostMapper from './PgPostMapper';
import PgThreadMapper from './PgThreadMapper';

class PgSectionMapper extends SectionMapper {
  public static mapToSectionModel(section: Section): SectionModel {
    return {
      id: section.id,
      title: section.title,
      posts: section.posts
        ? section.posts.map((post) => PgPostMapper.mapToPostModel(post))
        : [],
      threads: section.threads
        ? section.threads.map((thread) =>
            PgThreadMapper.mapToThreadModel(thread),
          )
        : [],
    };
  }
}

export default PgSectionMapper;
