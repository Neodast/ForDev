import SectionMapper from '../../core/mappers/section.mapper';
import SectionModel from '../../core/models/section.model';
import { Section } from '../entities/section.entity';
import PgPostMapper from './post.db-mapper';
import PgThreadMapper from './thread.db-mapper';

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
