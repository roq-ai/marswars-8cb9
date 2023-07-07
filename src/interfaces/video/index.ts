import { CommentInterface } from 'interfaces/comment';
import { DebaterInterface } from 'interfaces/debater';
import { GetQueryInterface } from 'interfaces';

export interface VideoInterface {
  id?: string;
  title: string;
  description?: string;
  debater_id?: string;
  created_at?: any;
  updated_at?: any;
  comment?: CommentInterface[];
  debater?: DebaterInterface;
  _count?: {
    comment?: number;
  };
}

export interface VideoGetQueryInterface extends GetQueryInterface {
  id?: string;
  title?: string;
  description?: string;
  debater_id?: string;
}
