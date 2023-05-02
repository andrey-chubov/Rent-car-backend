import { ApiProperty } from '@nestjs/swagger';
import { IsDateString } from 'class-validator';

class GetBookingByDateQuery {
  @ApiProperty({
    type: String,
    description: 'Start date for selection ',
    example: '2022-02-01',
  })
  @IsDateString()
  dateStart: string;

  @ApiProperty({
    type: String,
    description: 'Finish date for selection ',
    example: '2022-02-03',
  })
  @IsDateString()
  dateFinish: string;
}

export default GetBookingByDateQuery;
