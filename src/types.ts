import Moment from 'moment'

export interface User {
	id: number;
	name: string;
}

export interface RawMessage {
  id: number;
  authorId: number;
  author: User;
  body: string;
  createdAt: string;
}

export interface Message {
	id: number;
  authorId: number;
  author: User;
  body: string;
  createdAt: Moment.Moment;
}
