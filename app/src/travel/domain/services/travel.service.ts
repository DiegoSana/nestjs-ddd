import { Inject, Injectable } from '@nestjs/common';

import { TravelRepository } from '../entities/travel.repository';
import { repositoryTokens } from 'src/constants/constants';
import { ITravel } from '../entities/travel';
import { TravelComment } from '../entities/travel-comment';

@Injectable()
export class TravelService {
  constructor(
    @Inject(repositoryTokens.TRAVEL_REPOSITORY_IMPL_TOKEN)
    private travelRepository: TravelRepository,
  ) {}

  finish(travelId: number, comment?: string): Promise<ITravel | null> {
    return this.travelRepository
      .getById(travelId)
      .then((travel: ITravel | null) => {
        if (!travel) return null;

        if (comment) {
          travel.comments.push(new TravelComment({ comment: comment }));
        }
        travel.status = 2;

        return this.travelRepository.updateTravel(travel);
      });
  }

  cancle(): string {
    return 'Travels cancle';
  }

  reschedule(): string {
    return 'Travels reschedule';
  }
}
