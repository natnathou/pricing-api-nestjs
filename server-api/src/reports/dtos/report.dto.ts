import { Expose, Transform } from 'class-transformer';
import { Report } from '../reports.entrity';

export class ReportDto {
  @Expose()
  id: number;

  @Expose()
  price: number;

  @Expose()
  make: string;

  @Expose()
  model: string;

  @Expose()
  lng: number;

  @Expose()
  lat: number;

  @Expose()
  mileage: number;

  @Expose()
  year: number;

  @Expose()
  @Transform(({ obj }: { obj: Report }) => obj.user.id)
  userId: number;
}
