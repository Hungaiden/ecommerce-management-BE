import type { CreateTourDto } from './create.tour.dto'

export interface UpdateTourDto extends Partial<CreateTourDto> {
  _id: string;
}
