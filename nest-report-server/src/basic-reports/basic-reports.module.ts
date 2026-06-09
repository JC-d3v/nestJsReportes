import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BasicReportsService } from './basic-reports.service';
import { BasicReportsController } from './basic-reports.controller';
import { PrinterModule } from 'src/printer/printer.module';
import { Employee } from 'src/entities/employee.entity';
import { Country } from 'src/entities/country.entity';

@Module({
  controllers: [BasicReportsController],
  providers: [BasicReportsService],
  imports: [PrinterModule, TypeOrmModule.forFeature([Employee, Country])],
})
export class BasicReportsModule {}
