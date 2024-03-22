import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from './postEntity';
import { User } from './userEntity';
import { Thread } from './threadEntity';
import { Quiz } from './quizEntity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column()
  likes: number;

  @ManyToOne(() => Post, (post) => post.comments)
  post: Post;

  @ManyToOne(() => Thread, (thread) => thread.comments)
  thread: Thread;

  @ManyToOne(() => Quiz, (quiz) => quiz.comments)
  quiz: Quiz;

  @ManyToOne(() => User, (user) => user.comments)
  author: User;
}
