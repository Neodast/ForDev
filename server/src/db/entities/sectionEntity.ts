import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Thread } from './ThreadEntity';
import { Post } from './PostEntity';
import { Quiz } from './QuizEntity';

@Entity()
export class Section {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  title: string;

  @OneToMany(() => Thread, (thread) => thread.section, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  threads: Thread[];

  @OneToMany(() => Post, (post) => post.section, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  posts: Post[];

  @OneToMany(() => Quiz, (quiz) => quiz.section, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  quizzes: Quiz[];
}
