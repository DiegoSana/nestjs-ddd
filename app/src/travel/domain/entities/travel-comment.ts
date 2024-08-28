export type TravelCommentProperties = {
  id?: number;
  comment: string;
  created_at?: Date;
  updated_at?: Date;
};

export interface ITravelComment {
  readonly id?: number;
  readonly comment: string;
  readonly created_at?: Date;
  readonly updated_at?: Date;
}

export class TravelComment implements ITravelComment {
  readonly id?: number;
  readonly comment: string;
  readonly created_at?: Date;
  readonly updated_at?: Date;

  constructor(properties: TravelCommentProperties) {
    this.id = properties.id;
    this.comment = properties.comment;
    this.created_at = properties.created_at;
    this.updated_at = properties.updated_at;
  }
}
