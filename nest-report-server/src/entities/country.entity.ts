import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('countries')
export class Country {
  @PrimaryColumn({ type: 'bigint' })
  id: string;

  @Column({ nullable: true })
  name: string;

  @Column()
  iso2: string;

  @Column({ nullable: true })
  iso3: string;

  @Column({ nullable: true })
  local_name: string;

  @Column({ nullable: true })
  continent: string;
}
