import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class ErrorBadRequest {
  @ApiProperty({
    type: Number,
    description: 'HTTP status code',
    example: HttpStatus.BAD_REQUEST,
  })
  statusCode: number;

  @ApiProperty({
    type: Array,
    description: 'Messages',
    example: ['Some message', 'Some message'],
  })
  message: string[];

  @ApiProperty({
    type: String,
    description: 'HTTP status',
    example: 'Bad Request',
  })
  error: string;
}
