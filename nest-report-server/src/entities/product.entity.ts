import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { OrderDetail } from './order-detail.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  product_id: number;

  @Column({ length: 255, nullable: true })
  product_name: string;

  @Column({ nullable: true })
  category_id: number;

  @Column({ length: 255, nullable: true })
  unit: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  price: number;

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  categories: Category;

  @OneToMany(() => OrderDetail, (od) => od.products)
  order_details: OrderDetail[];
}
