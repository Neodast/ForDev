import {
  Column,
  Entity,
  OneToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Comment } from './commentEntity';
import { User } from './userEntity';
import { Section } from './sectionEntity';

@Entity({
  orderBy: {
    title: 'DESC',
  },
})
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({
    type: 'varchar',
    length: 800,
    unique: true,
  })
  text: string;

  @Column()
  likes: number;

  @OneToMany(() => Comment, (comment) => comment.post, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  comments: Comment[];

  @ManyToOne(() => User, (user) => user.posts, { nullable: false })
  author: User;

  @ManyToOne(() => Section, (section) => section.posts, { nullable: false })
  section: Section;
}
