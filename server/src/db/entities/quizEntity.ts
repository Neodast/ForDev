import {
  Column,
  Entity,
  OneToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Comment } from './commentEntity';
import { User } from './userEntity';

@Entity()
export class Quiz {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "varchar",
    length: 150,
    unique: true,
  })
  title: string;

  @Column()
  question: string;

  @Column("text",{ array: true })
  answers: string[];

  @Column()
  rightAnswer: string;

  @Column()
  likes: number;

  @OneToMany(() => Comment, (comment) => comment.quiz)
  comments: Comment[];

  @ManyToOne(() => User, (user) => user.quizzes, { nullable: false })
  author: User;
}
