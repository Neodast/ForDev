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
export class Thread {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "varchar",
    length: 150,
    unique: true,
  })
  title: string;

  @Column()
  text: string;

  @Column()
  likes: number;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @ManyToOne(() => User, (user) => user.posts, { nullable: false })
  author: User;
}
