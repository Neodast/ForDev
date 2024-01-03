import {
	Column,
	Entity,
	JoinColumn,
	OneToOne,
	PrimaryGeneratedColumn,
} from 'typeorm'
import { Token } from './tokenEntity';
import Role from '../utils/enums/roles.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column()
  name!: string;

  @Column()
  surname?: string;

  @Column({ default: false })
  isVerified!: boolean;

  @Column({
		type: 'enum',
		enum: Role,
		default: Role.USER,
	})
	role!: Role

  @OneToOne(() => Token, (token) => token.user)
  token!: Token;
}

