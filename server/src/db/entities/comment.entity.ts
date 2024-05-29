import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from './post.entity';
import { User } from './user.entity';
import { Thread } from './thread.entity';
import { Like } from './like.entity';

@Entity({ name: 'Comments' })
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @OneToMany(() => Like, (like) => like.comment)
  likes: Like[];

  @ManyToOne(() => Post, (post) => post.comments, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    cascade: true,
  })
  post: Post;

  @ManyToOne(() => Thread, (thread) => thread.comments, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    cascade: true,
  })
  thread: Thread;

  @ManyToOne(() => User, (user) => user.comments, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    cascade: true,
  })
  author: User;
}
