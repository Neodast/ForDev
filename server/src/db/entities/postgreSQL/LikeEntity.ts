import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from './PostEntity';
import { Comment } from './CommentEntity';
import { Thread } from './ThreadEntity';
import { User } from './UserEntity';
import { Quiz } from './QuizEntity';

@Entity({ name: 'Likes' })
export class Like {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.likes, {nullable: false})
  user: User;

  @ManyToOne(() => Post, (post) => post.likes)
  post: Post;

  @ManyToOne(() => Comment, (comment) => comment.likes)
  comment: Comment;

  @ManyToOne(() => Thread, (thread) => thread.likes)
  thread: Thread;

  @ManyToOne(() => Quiz, (quiz) => quiz.likes)
  quiz: Quiz;
}
