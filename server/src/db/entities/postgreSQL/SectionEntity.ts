import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Thread } from './ThreadEntity';
import { Post } from './PostEntity';

@Entity({ name: 'Sections' })
export class Section {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  title: string;

  @OneToMany(() => Thread, (thread) => thread.section)
  threads: Thread[];

  @OneToMany(() => Post, (post) => post.section)
  posts: Post[];

}
