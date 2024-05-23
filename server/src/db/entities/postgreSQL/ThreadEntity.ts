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

@Entity({ name: 'Threads' })
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

  @CreateDateColumn({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  creationDate: Date;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @OneToMany(() => Like, (likes) => likes.thread )
  likes: Like[];

  @ManyToOne(() => User, (user) => user.posts, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    cascade: true,
    nullable: false,
  })
  author: User;

  @ManyToOne(() => Section, (section) => section.posts, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    cascade: true,
  })
  section: Section;
}
