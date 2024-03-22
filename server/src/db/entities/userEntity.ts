import {
  Column,
  Entity,
  OneToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Token } from './tokenEntity';
import Role from '../../utils/enums/roles.enum';
import { Post } from './postEntity';
import { Comment } from './commentEntity';
import { Thread } from './threadEntity';
import { Quiz } from './quizEntity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  surname: string;

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

  @OneToMany(() => Quiz, (quiz) => quiz.author)
  quizzes: Quiz[];

  @OneToMany(() => Comment, (comment) => comment.author)
  comments: Comment[];
}
