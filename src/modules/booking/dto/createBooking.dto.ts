import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber, Validate } from 'class-validator';
import { IsWeekEnd } from '../../../decorators/IsWeekEnd';
import { WEEKEND } from '../../../shared/errors/errorMessages';

export class CreateBookingDto {
  @ApiProperty({
    type: String,
    description: 'Date start booking',
    example: '2022-02-01',
  })
  @IsDateString()
  @Validate(IsWeekEnd, [0, 6], {
    message: WEEKEND,
  })
  dateStart: string;

  @ApiProperty({
    type: String,
    description: 'Date finish booking',
    example: '2022-02-02',
  })
  @IsDateString()
  @Validate(IsWeekEnd, [0, 6], {
    message: WEEKEND,
  })
  dateFinish: string;

  @ApiProperty({
    type: Number,
    description: 'ID car',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  carId: number;
}
