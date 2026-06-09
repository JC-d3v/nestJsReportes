import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('employees')
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 50 })
  position: string;

  @Column({ type: 'date' })
  start_date: Date;

  @Column({ type: 'time', nullable: true })
  work_time: string;

  @Column()
  hours_per_day: number;

  @Column({ length: 50 })
  work_schedule: string;
}
