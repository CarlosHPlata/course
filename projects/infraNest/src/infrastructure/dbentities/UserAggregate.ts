import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('USERS')
export class UserAggregate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  email: string;
}
