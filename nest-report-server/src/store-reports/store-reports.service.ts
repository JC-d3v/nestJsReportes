import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PrinterService } from 'src/printer/printer.service';
import {
  getBasicChartSvgReport,
  getStatisticsReport,
  orderByIdReport,
} from 'src/reports';
import { Order } from 'src/entities/order.entity';
import { Customer } from 'src/entities/customer.entity';

@Injectable()
export class StoreReportsService {
  constructor(
    private readonly printerService: PrinterService,
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
    @InjectRepository(Customer)
    private readonly customerRepo: Repository<Customer>,
  ) {}

  async getOrderByIdReport(orderId: number) {
    const order = await this.orderRepo.findOne({
      where: { order_id: orderId },
      relations: { customers: true, order_details: { products: true } },
    });

    if (!order) {
      throw new NotFoundException(`Order with id ${orderId} not found`);
    }

    const docDefinition = orderByIdReport({ data: order as any });
    return this.printerService.createPdf(docDefinition);
  }

  async getSvgChart() {
    const docDefinition = await getBasicChartSvgReport();
    return this.printerService.createPdf(docDefinition);
  }

  async getStatistics() {
    const topCountries = await this.customerRepo
      .createQueryBuilder('c')
      .select('c.country', 'country')
      .addSelect('COUNT(*)', 'customers')
      .groupBy('c.country')
      .orderBy('customers', 'DESC')
      .limit(10)
      .getRawMany<{ country: string; customers: string }>();

    const topCountryData = topCountries.map(({ country, customers }) => ({
      country,
      customers: parseInt(customers),
    }));

    const docDefinition = await getStatisticsReport({
      topCountries: topCountryData,
    });
    return this.printerService.createPdf(docDefinition);
  }
}
