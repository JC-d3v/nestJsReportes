import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreReportsService } from './store-reports.service';
import { StoreReportsController } from './store-reports.controller';
import { PrinterModule } from 'src/printer/printer.module';
import { Order } from 'src/entities/order.entity';
import { Customer } from 'src/entities/customer.entity';
import { OrderDetail } from 'src/entities/order-detail.entity';
import { Product } from 'src/entities/product.entity';
import { Category } from 'src/entities/category.entity';

@Module({
  controllers: [StoreReportsController],
  providers: [StoreReportsService],
  imports: [
    PrinterModule,
    TypeOrmModule.forFeature([Order, Customer, OrderDetail, Product, Category]),
  ],
})
export class StoreReportsModule {}
