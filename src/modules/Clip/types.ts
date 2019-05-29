import { HttpRequest } from '~/types';

export type ClipMetadata = {
  audio: string;
  createdAt: string;
  description: string;
  end: number;
  episode: {
    id: string;
    title: string;
    description: string;
    audioLength: number;
    published: Date;
  };
  id: string;
  podcast: { id: string; title: string; description: string; thumbnail: string };
  published: Date;
  likesCount: number;
  stars: number; // delete this
  start: number;
  title: string;
  views: number;
};

export type ClipState = {
  metadata: HttpRequest<ClipMetadata>;
};
