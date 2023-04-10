import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UsePipes,
  UseFilters,
  HttpStatus,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ValidationFilter } from 'src/filters/validation.filter';
import { UserValidationPipes } from 'src/pipes/validation.pipe';
import { ErrorBadRequest } from 'src/shared/responses/errorResponse';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/createBooking.dto';
import { Booking } from './entities/booking.entity';

@ApiTags('Booking')
@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}
  @ApiOperation({
    summary: 'Create booking car',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: Booking,
    description: 'Created booking car',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ErrorBadRequest,
    description: 'Bad Request',
  })
  @UsePipes(UserValidationPipes)
  @UseFilters(new ValidationFilter())
  @Post()
  create(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingService.create(createBookingDto);
  }

  @ApiOperation({
    summary: 'Get booking by car ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: [Booking],
    description: 'Get booking by car ID',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ErrorBadRequest,
    description: 'Bad Request',
  })
  @Get(':id')
  getByCarId(@Param('id') id: number) {
    return this.bookingService.getBookingByCar(id);
  }

  @ApiOperation({
    summary: 'Get all booking',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: [Booking],
    description: 'Get all booking',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ErrorBadRequest,
    description: 'Bad Request',
  })
  @Get()
  getAllBooking() {
    return this.bookingService.getAllBooking();
  }
}
