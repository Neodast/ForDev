import SectionMapper from '../../../core/mappers/sectionMapper';
import SectionModel from '../../../core/models/sectionModel';
import { Section } from '../../entities/sectionEntity';
import PgPostMapper from './pgPostMapper';
import PgQuizMapper from './pgQuizMapper';
import PgThreadMapper from './pgThreadMapper';

class PgSectionMapper extends SectionMapper {
  public static mapToSectionModel(section: Section): SectionModel {
    return {
      id: section.id,
      title: section.title,
      posts: section.posts.map((post) => PgPostMapper.mapToPostModel(post)),
      quizzes: section.quizzes.map((quiz) => PgQuizMapper.mapToQuizModel(quiz)),
      threads: section.threads.map((thread) => PgThreadMapper.mapToThreadModel(thread)),
    };
  }
}

export default PgSectionMapper;
