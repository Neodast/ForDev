import {
  Column,
  Entity,
  OneToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Comment } from './CommentEntity';
import { User } from './UserEntity';
import { Section } from './SectionEntity';
import { Like } from './LikeEntity';

@Entity({ name: 'Quizzes'})
export class Quiz {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({
    type: 'varchar',
    length: 100,
    unique: true,
  })
  question: string;

  @Column('text', { array: true })
  answers: string[];

  @Column()
  rightAnswer: string;

  @OneToMany(() => Comment, (comment) => comment.quiz, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  comments: Comment[];

  @ManyToOne(() => User, (user) => user.quizzes, { nullable: false })
  author: User;

  @ManyToOne(() => Section, (section) => section.posts, { nullable: false })
  section: Section;

  @OneToMany(() => Like, (like) => like.post, {
    nullable: false,
    onDelete: 'CASCADE',
    cascade: true,
  })
  likes: Like[];
}
