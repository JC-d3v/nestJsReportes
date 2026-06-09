import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order.entity';

@Entity('customers')
export class Customer {
  @PrimaryGeneratedColumn()
  customer_id: number;

  @Column({ length: 255, nullable: true })
  customer_name: string;

  @Column({ length: 255, nullable: true })
  contact_name: string;

  @Column({ length: 255, nullable: true })
  address: string;

  @Column({ length: 255, nullable: true })
  city: string;

  @Column({ length: 255, nullable: true })
  postal_code: string;

  @Column({ length: 255, nullable: true })
  country: string;

  @OneToMany(() => Order, (order) => order.customers)
  orders: Order[];
}
