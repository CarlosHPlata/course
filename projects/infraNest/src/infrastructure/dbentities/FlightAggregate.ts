import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('Flight')
export class FlightAggregate {
  @PrimaryColumn({ type: 'varchar', length: 255 })
  flightNumber: string;

  @Column({ type: 'double' })
  baseprice: number;

  @Column({ type: 'varchar', length: 255 })
  departure: string;

  @Column({ type: 'varchar', length: 255 })
  destination: string;

  @Column({ type: 'date' })
  departureDate: Date;

  @Column({ type: 'date' })
  arrivalDate: Date;
}