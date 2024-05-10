import SectionMapper from '../../../core/mappers/SectionMapper';
import SectionModel from '../../../core/models/SectionModel';
import { Section } from '../../entities/SectionEntity';
import PgPostMapper from './PgPostMapper';
import PgQuizMapper from './PgQuizMapper';
import PgThreadMapper from './PgThreadMapper';

class PgSectionMapper extends SectionMapper {
  public static mapToSectionModel(section: Section): SectionModel {
    return {
      id: section.id,
      title: section.title,
      posts: section.posts
        ? section.posts.map((post) => PgPostMapper.mapToPostModel(post))
        : [],
      quizzes: section.quizzes
        ? section.quizzes.map((quiz) => PgQuizMapper.mapToQuizModel(quiz))
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
