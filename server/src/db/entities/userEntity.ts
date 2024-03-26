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

  @OneToMany(() => Quiz, (quiz) => quiz.author, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  quizzes: Quiz[];

  @OneToMany(() => Comment, (comment) => comment.author, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  comments: Comment[];
}
