import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { PrinterService } from 'src/printer/printer.service';
import {
  getCountryReport,
  getEmploymentLetterByIdReport,
  getEmploymentLetterReport,
  getHelloWorldReport,
} from 'src/reports';
import { Employee } from 'src/entities/employee.entity';
import { Country } from 'src/entities/country.entity';

@Injectable()
export class BasicReportsService {
  constructor(
    private readonly printerService: PrinterService,
    @InjectRepository(Employee)
    private readonly employeeRepo: Repository<Employee>,
    @InjectRepository(Country)
    private readonly countryRepo: Repository<Country>,
  ) { }

  async hello() {
    const docDefinition = getHelloWorldReport({ name: 'Jorge Calderon' });
    return this.printerService.createPdf(docDefinition);
  }

  async employmentLetter() {
    const docDefinition = getEmploymentLetterReport();
    return this.printerService.createPdf(docDefinition);
  }

  async employmentLetterById(employeeId: number) {
    const employee = await this.employeeRepo.findOne({
      where: { id: employeeId },
    });

    if (!employee) {
      throw new NotFoundException(`Employee with id ${employeeId} not found`);
    }

    const docDefinition = getEmploymentLetterByIdReport({
      employerName: 'Fernando Herrera',
      employerPosition: 'Gerente de RRHH',
      employeeName: employee.name,
      employeePosition: employee.position,
      employeeStartDate: employee.start_date,
      employeeHours: employee.hours_per_day,
      employeeWorkSchedule: employee.work_schedule,
      employerCompany: 'Tucan Code Corp.',
    });

    return this.printerService.createPdf(docDefinition);
  }

  async getCountries() {
    const countries = await this.countryRepo.find({
      where: { local_name: Not(IsNull()) },
    });

    const docDefinition = getCountryReport({ countries });
    return this.printerService.createPdf(docDefinition);
  }
}
