import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from './order.entity';
import { Product } from './product.entity';

@Entity('order_details')
export class OrderDetail {
  @PrimaryGeneratedColumn()
  order_detail_id: number;

  @Column({ nullable: true })
  order_id: number;

  @Column({ nullable: true })
  product_id: number;

  @Column({ nullable: true })
  quantity: number;

  @ManyToOne(() => Order, (order) => order.order_details)
  @JoinColumn({ name: 'order_id' })
  orders: Order;

  @ManyToOne(() => Product, (product) => product.order_details)
  @JoinColumn({ name: 'product_id' })
  products: Product;
}
