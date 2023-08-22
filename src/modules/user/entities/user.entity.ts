import { IsEmail } from 'class-validator';
import { Role } from 'src/modules/auth/roles.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @IsEmail()
  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column('enum', { enum: Role, array: true, default: [Role.User] })
  roles: Role[];
}
