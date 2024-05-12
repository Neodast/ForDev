import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from './PostEntity';
import { User } from './UserEntity';
import { Thread } from './ThreadEntity';
import { Quiz } from './QuizEntity';

@Entity({ name: 'Comments' })
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
