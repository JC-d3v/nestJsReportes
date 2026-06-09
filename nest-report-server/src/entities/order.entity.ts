import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Customer } from './customer.entity';
import { OrderDetail } from './order-detail.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  order_id: number;

  @Column({ nullable: true })
  customer_id: number;

  @Column({ type: 'date', nullable: true })
  order_date: Date;

  @ManyToOne(() => Customer, (customer) => customer.orders)
  @JoinColumn({ name: 'customer_id' })
  customers: Customer;

  @OneToMany(() => OrderDetail, (od) => od.orders)
  order_details: OrderDetail[];
}
