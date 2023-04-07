import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Query,
  UseFilters,
  UsePipes,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ValidationFilter } from 'src/filters/validation.filter';
import { UserValidationPipes } from 'src/pipes/validation.pipe';
import { ErrorBadRequest } from 'src/shared/responses/errorResponse';
import { BookingStatisticService } from './bookingStat.service';
import GetBookingByDateQuery from './dto/bookingDataParams';
import BookingCarStatisticsModel from './entities/bookingStat.model';

@ApiTags('Statistic')
@Controller('statistic')
export class BookingStatisticController {
  constructor(
    private readonly bookingStatisticService: BookingStatisticService,
  ) {}

  @ApiOperation({
    summary: 'Get all booking statistic',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: [BookingCarStatisticsModel],
    description: 'Get all booking statistic',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ErrorBadRequest,
    description: 'Bad Request',
  })
  @Get('all-cars-bookings')
  getAllCarsBookings() {
    return this.bookingStatisticService.getAllCarsBookings();
  }

  @ApiOperation({
    summary: 'Get all booking statistic by date period',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: [BookingCarStatisticsModel],
    description: 'Get all booking statistic by date period',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ErrorBadRequest,
    description: 'Bad Request',
  })
  @UsePipes(UserValidationPipes)
  @UseFilters(new ValidationFilter())
  @Get('all-cars-bookings-date')
  getAllCarsBookingsByDate(@Query() query: GetBookingByDateQuery) {
    return this.bookingStatisticService.getAllCarsBookingsByDate(query);
  }

  @ApiOperation({
    summary: 'Get booking statistic by car ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: BookingCarStatisticsModel,
    description: 'Get booking statistic by car ID',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ErrorBadRequest,
    description: 'Bad Request',
  })
  @Get('car-bookings/:id')
  getCarBookings(@Param('id') id: number) {
    return this.bookingStatisticService.getCarBookings(id);
  }

  @ApiOperation({
    summary: 'Get booking statistic by car ID an by date period',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: BookingCarStatisticsModel,
    description: 'Get booking statistic by car ID an by date period',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ErrorBadRequest,
    description: 'Bad Request',
  })
  @Get('car-bookings-date/:id')
  getCarBookingsByDate(
    @Param('id') id: number,
    @Query() query: GetBookingByDateQuery,
  ) {
    return this.bookingStatisticService.getCarBookingsByDate(id, query);
  }
}
