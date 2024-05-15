import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from './PostEntity';
import { User } from './UserEntity';
import { Thread } from './ThreadEntity';
import { Like } from './LikeEntity';

@Entity({ name: 'Comments' })
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @OneToMany(() => Like, (like) => like.comment, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  likes: Like[];

  @ManyToOne(() => Post, (post) => post.comments)
  post: Post;

  @ManyToOne(() => Thread, (thread) => thread.comments)
  thread: Thread;

  @ManyToOne(() => User, (user) => user.comments)
  author: User;
}
