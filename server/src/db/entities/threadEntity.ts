import {
  Column,
  Entity,
  OneToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Comment } from './CommentEntity';
import { User } from './UserEntity';
import { Section } from './SectionEntity';

@Entity()
export class Thread {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({
    type: 'varchar',
    length: 255,
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
