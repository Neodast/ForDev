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

@Entity()
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

  @Column()
  likes: number;

  @OneToMany(() => Comment, (comment) => comment.quiz, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  comments: Comment[];

  @ManyToOne(() => User, (user) => user.quizzes, { nullable: false })
  author: User;

  @ManyToOne(() => Section, (section) => section.posts, { nullable: false })
  section: Section;
}
