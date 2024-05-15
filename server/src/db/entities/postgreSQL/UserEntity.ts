import {
  Column,
  Entity,
  OneToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Token } from './TokenEntity';
import Role from '../../../utils/enums/roles.enum';
import { Post } from './PostEntity';
import { Comment } from './CommentEntity';
import { Thread } from './ThreadEntity';
import { Like } from './LikeEntity';

@Entity({
  name: 'Users',
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, type: 'text' })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  nickname: string;

  @Column({ default: false })
  isVerified: boolean;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  role: Role;

  @OneToOne(() => Token, (token) => token.user)
  token: Token;

  @OneToMany(() => Post, (post) => post.author, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  posts: Post[];

  @OneToMany(() => Thread, (thread) => thread.author, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  threads: Thread[];

  @OneToMany(() => Comment, (comment) => comment.author, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  comments: Comment[];

  @OneToMany(() => Like, (like) => like.user, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  likes: Like[];
}
