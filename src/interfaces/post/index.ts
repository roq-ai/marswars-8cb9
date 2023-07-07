import { DebaterInterface } from 'interfaces/debater';
import { GetQueryInterface } from 'interfaces';

export interface PostInterface {
  id?: string;
  content: string;
  debater_id?: string;
  created_at?: any;
  updated_at?: any;

  debater?: DebaterInterface;
  _count?: {};
}

export interface PostGetQueryInterface extends GetQueryInterface {
  id?: string;
  content?: string;
  debater_id?: string;
}
