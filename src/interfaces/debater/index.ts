import { CommentInterface } from 'interfaces/comment';
import { PostInterface } from 'interfaces/post';
import { VideoInterface } from 'interfaces/video';
import { UserInterface } from 'interfaces/user';
import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface DebaterInterface {
  id?: string;
  user_id?: string;
  organization_id?: string;
  created_at?: any;
  updated_at?: any;
  comment?: CommentInterface[];
  post?: PostInterface[];
  video?: VideoInterface[];
  user?: UserInterface;
  organization?: OrganizationInterface;
  _count?: {
    comment?: number;
    post?: number;
    video?: number;
  };
}

export interface DebaterGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  organization_id?: string;
}
