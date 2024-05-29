import {
  Column,
  Entity,
  OneToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Token } from './token.entity';
import Role from '../../utils/enums/roles.enum';
import { Post } from './post.entity';
import { Comment } from './comment.entity';
import { Thread } from './thread.entity';
import { Like } from './like.entity';

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

  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];

  @OneToMany(() => Thread, (thread) => thread.author)
  threads: Thread[];

  @OneToMany(() => Comment, (comment) => comment.author)
  comments: Comment[];

  @OneToMany(() => Like, (like) => like.user)
  likes: Like[];
}
