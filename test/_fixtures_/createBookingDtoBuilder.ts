import { CreateBookingDto } from '../../src/modules/booking/dto/createBooking.dto';
import InjectionFixtureBuilder from '../../src/shared/utils/injectionFixtureBuilder';

export class CreateBookingDtoBuilder {
  public static forFourthDays(): InjectionFixtureBuilder<CreateBookingDto> {
    return new InjectionFixtureBuilder(new CreateBookingDto())
      .with({ dateStart: new Date('2023-01-02') })
      .with({ dateFinish: new Date('2023-01-06') })
      .with({ carId: 1 });
  }
  public static forCarBusy(): InjectionFixtureBuilder<CreateBookingDto> {
    return new InjectionFixtureBuilder(new CreateBookingDto())
      .with({ dateStart: new Date('2023-01-03') })
      .with({ dateFinish: new Date('2023-01-04') })
      .with({ carId: 1 });
  }

  public static forInterval(): InjectionFixtureBuilder<CreateBookingDto> {
    return new InjectionFixtureBuilder(new CreateBookingDto())
      .with({ dateStart: new Date('2023-01-08') })
      .with({ dateFinish: new Date('2023-01-12') })
      .with({ carId: 1 });
  }
}
