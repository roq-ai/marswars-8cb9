import { VideoInterface } from 'interfaces/video';
import { DebaterInterface } from 'interfaces/debater';
import { GetQueryInterface } from 'interfaces';

export interface CommentInterface {
  id?: string;
  content: string;
  video_id?: string;
  debater_id?: string;
  created_at?: any;
  updated_at?: any;

  video?: VideoInterface;
  debater?: DebaterInterface;
  _count?: {};
}

export interface CommentGetQueryInterface extends GetQueryInterface {
  id?: string;
  content?: string;
  video_id?: string;
  debater_id?: string;
}
