import {
  Column,
  Entity,
  OneToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';
import { Comment } from './CommentEntity';
import { User } from './UserEntity';
import { Section } from './SectionEntity';
import { Like } from './LikeEntity';

@Entity({ name: 'Posts' })
export class Post {
  @PrimaryGeneratedColumn()
  id: number;//TODO make id 'uuid' and refactore all code with id in backend

  @Column()
  title: string;

  @Column({
    type: 'varchar',
    length: 800,
    unique: true,
  })
  text: string;

  @Column({nullable: true})
  imageLink: string;

  @CreateDateColumn({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  creationDate: Date;

  @OneToMany(() => Comment, (comment) => comment.post, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  comments: Comment[];

  @ManyToOne(() => User, (user) => user.posts, { nullable: false })
  author: User;

  @ManyToOne(() => Section, (section) => section.posts, { nullable: false })
  section: Section;

  @OneToMany(() => Like, (like) => like.post, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  likes: Like[];
}
