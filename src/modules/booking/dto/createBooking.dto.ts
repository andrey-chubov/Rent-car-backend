import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber, Validate } from 'class-validator';
import { IsWeekEnd } from '../../../decorators/IsWeekEnd';
import { WEEKEND } from '../../../shared/errors/errorMessages';
import { Transform, Type } from 'class-transformer';

export class CreateBookingDto {
  @ApiProperty({
    type: String,
    description: 'Date start booking',
    example: '2022-02-01',
  })
  @IsDate()
  @Type(() => Date)
  @Transform(({value}) => new Date(value))
  @Validate(IsWeekEnd, [0, 6], {
    message: WEEKEND,
  })
  dateStart: Date;

  @ApiProperty({
    type: String,
    description: 'Date finish booking',
    example: '2022-02-02',
  })
  @IsDate()
  @Type(() => Date)
  @Transform(({value}) => new Date(value))
  @Validate(IsWeekEnd, [0, 6], {
    message: WEEKEND,
  })
  dateFinish: Date;

  @ApiProperty({
    type: Number,
    description: 'ID car',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  carId: number;
}
