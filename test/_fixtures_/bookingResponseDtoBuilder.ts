import { BookingResponseDto } from '../../src/shared/responses/bookingResponse.dto';
import InjectionFixtureBuilder from '../../src/shared/utils/injectionFixtureBuilder';

export class BookingResponseDtoBuilder {
  public static defaultAll(): InjectionFixtureBuilder<BookingResponseDto> {
    return new InjectionFixtureBuilder(new BookingResponseDto())
      .with({ id: 1 })
      .with({ carId: 1 })
      .with({ dateStart: new Date('2023-01-02') })
      .with({ dateFinish: new Date('2023-01-06') })
      .with({ duration: 4 })
      .with({ price: 4000 });
  }
}
