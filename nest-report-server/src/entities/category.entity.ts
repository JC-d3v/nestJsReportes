import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  category_id: number;

  @Column({ length: 255, nullable: true })
  category_name: string;

  @Column({ length: 255, nullable: true })
  description: string;

  @OneToMany(() => Product, (product) => product.categories)
  products: Product[];
}
